from fastapi import FastAPI, Form, Request, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import json
import time
import tempfile

from config.generation import AgriculturalAdvisor
from config.intent import AgriculturalNLP
from config.transcription import ASRTranscriber
from config.translation import TwiEnglishTranslatorHF
from config.convertions import convertText

app = FastAPI(redirect_slashes=False)

# Mount static directory to serve generated audio files
base_dir = os.path.abspath(os.path.dirname(__file__))
audio_dir = os.path.join(base_dir, "audio")
os.makedirs(audio_dir, exist_ok=True)
app.mount("/audio", StaticFiles(directory=audio_dir), name="audio")

# Enable CORS for development (adjust origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nlp_system = AgriculturalNLP()
knowledge_base = AgriculturalAdvisor()
translator = TwiEnglishTranslatorHF()

@app.get("/")
def Home():

    return "API running..."

def _format_duration_fields(duration_min: float):
    whole_minutes = int(duration_min)
    seconds = (duration_min - whole_minutes) * 60.0
    duration_str = f"{whole_minutes:02d}:{seconds:06.3f}"
    return {
        "duration_ms": round(duration_min * 60000, 2),
        "duration_min": round(duration_min, 3),
        "duration_str": duration_str,
    }

def ttsAction(query_text, lang, request=None, length_scale=1.7, noise_scale=0.7, noise_w=0.8):
    
    aud_file = convertText(query_text, lang, length_scale, noise_scale, noise_w)

    if not aud_file:
        return False

    # Build public URL for the generated file
    filename = os.path.basename(aud_file)
    if request:
        base_url = str(request.base_url).rstrip('/')
        public_url = f"{base_url}/audio/{filename}"
    else:
        public_url = f"/audio/{filename}"

    return public_url

@app.post("/convertTextToAudio")
async def convertToAudio(request: Request):
    print("converting...")
    data = await request.json()

    lang = data.get("preferred_language")
    query_text = data.get("query_text")

    public_url = ttsAction(query_text, lang, request)

    if not public_url:
        return False
    print("Audio Url: ", public_url)

    return {"audio_url": public_url}

def process(data: dict, request: Request):
    # Parameters
    print("Getting request parameters...")
    query_text = data["query_text"]
    preferred_language = data["preferred_language"]
    query_formart = data["query_formart"]

    # The form values are now directly available as strings
    query_text_value = query_text
    preferred_language_value = preferred_language
    query_formart_value = query_formart

    # Question
    question_text = ""
    overall_start = time.perf_counter()
    
    # STEP 1: Transcribe Twi
    step1_start = time.perf_counter()
    if query_formart_value == "audio":
        print("reading Audio File...")
        audio_bytes = data["audio_bytes"]
        audio_filename = data["audio_filename"]
        print("Audio File read ✅")
        # Save audio bytes to temporary file for transcription
        
        try:
            # Preserve original file extension if available (e.g., .m4a)
            original_ext = os.path.splitext(audio_filename or "")[1] or ".wav"
            with tempfile.NamedTemporaryFile(suffix=original_ext, delete=False) as temp_file:
                temp_file.write(audio_bytes)
                temp_file_path = temp_file.name
            
            question_text = ASRTranscriber(temp_file_path)
            print("Transcription: ", question_text)
            
            # Clean up temporary file
            os.unlink(temp_file_path)

        except Exception as e:
            print("Error Transcribing: ", e)
            return
    
    else:
        question_text = query_text_value

    print("")
    step1_ms = (time.perf_counter() - step1_start) * 1000
    step1_min = step1_ms / 60000.0
    step1_fields = _format_duration_fields(step1_min)
    print(f"Step 1 (transcription) took {step1_fields['duration_str']} ({step1_fields['duration_ms']} ms)")
    print("Sending Response 1...")
    yield f"{json.dumps({'status': 'step 1', 'event': 'audio transcribed'})}\n\n"

    # STEP 2: Translate

    translated_text = ""
    step2_start = time.perf_counter()
    if preferred_language_value == "tw":
        print("translating text...")
        translated_text = translator.translate_twi_to_english(question_text)
        question_text = translated_text
        # question_text = translated_text[0]
        print("Translated Text: ", translated_text)
        # print("Translated Text: ", translated_text[0])

    step2_ms = (time.perf_counter() - step2_start) * 1000
    step2_min = step2_ms / 60000.0
    step2_fields = _format_duration_fields(step2_min)
    print(f"Step 2 (translation) took {step2_fields['duration_str']} ({step2_fields['duration_ms']} ms)")
    print("Sending response 2")
    yield f"{json.dumps({'status': 'step 3', 'event': 'translated to english'})}\n\n"


    # STEP 3: NLP Analysis
    # Processing the query to get the Intent and key Entities
    print("")
    print("Getting Intent using NLP...")
    print("Question Text: ", question_text)
    step3_start = time.perf_counter()
    processed_query = nlp_system.process(question_text)
    print("Intents for Processed Query: ", processed_query)

    # validating question
    print("Validating Query...")
    step3_ms = (time.perf_counter() - step3_start) * 1000
    step3_min = step3_ms / 60000.0
    step3_fields = _format_duration_fields(step3_min)

    if processed_query.confidence < 0.45:
        yield f"{json.dumps({'status': 'step 3', 'event': 'error', 'message': 'Not an Agricultural question'})}\n\n"
        return
        
    print("Query validate as agricultural question ✅")
    print(f"Step 3 (nlp) took {step3_fields['duration_str']} ({step3_fields['duration_ms']} ms)")
    print("Sending response 3")
    yield f"{json.dumps({'status': 'step 3', 'event': 'question understood!!', 'message': ''})}\n\n"

    # STEP 4: Agricultural Model Answer generation
    print("")
    print("Generating Agricultura Response...")
    step4_start = time.perf_counter()
    response = knowledge_base.generate_advice(processed_query)
    print("Response: ", response)

    step4_ms = (time.perf_counter() - step4_start) * 1000
    step4_min = step4_ms / 60000.0
    step4_fields = _format_duration_fields(step4_min)
    print(f"Step 4 (agri) took {step4_fields['duration_str']} ({step4_fields['duration_ms']} ms)")
    print("sending response 4...")
    yield f"{json.dumps({'status': 'step 4', 'event': 'Advice generated!!, translating into Twi', 'message': ''})}\n\n"
    
    # STEP 5: Translate back to 
    print("")
    eng_trans_twi = ""
    step5_start = time.perf_counter()
    if preferred_language_value == "tw":
        print("translating back to twi...")
        eng_trans_twi = translator.translate_english_to_twi(response)
        response = eng_trans_twi
        print("Translation: ", eng_trans_twi)

    step5_ms = (time.perf_counter() - step5_start) * 1000
    step5_min = step5_ms / 60000.0
    step5_fields = _format_duration_fields(step5_min)
    print(f"Step 5 (translate_back) took {step5_fields['duration_str']} ({step5_fields['duration_ms']} ms)")
    print("sending response 5....")
    yield f"{json.dumps({'status': 'step 6', 'event': 'translated, converting into audio', 'message': ''})}\n\n"
    
    # STEP 6: Convert to Audio
    print("")
    print("Convirting into Audio")
    step6_start = time.perf_counter()
    audio_convertion = ttsAction(response, preferred_language_value, request)

    step6_ms = (time.perf_counter() - step6_start) * 1000
    step6_min = step6_ms / 60000.0
    step6_fields = _format_duration_fields(step6_min)
    total_duration_ms = (time.perf_counter() - overall_start) * 1000
    total_duration_min = total_duration_ms / 60000.0
    total_fields = _format_duration_fields(total_duration_min)
    print("Audio Url: ", audio_convertion)
    print("")
    print(f"Step 6 (audio) took {step6_fields['duration_str']} ({step6_fields['duration_ms']} ms)")

    print(f"Total pipeline took {total_fields['duration_str']} ({total_fields['duration_ms']} ms)")
    print("Done ✅")
    yield f"{json.dumps({'status': 'done', 'event': 'response successfull', 'message': '', 'audio_url': f'{audio_convertion}'})}\n\n"
    
    return

@app.post("/process")
async def process_question(
    request: Request,
    audio_file: UploadFile = File(...),
    query_text: str = Form(""),
    preferred_language: str = Form(""),
    query_formart: str = Form(""),
):
    print("Incoming request")
    # Read the audio file content immediately before it gets closed
    audio_bytes = await audio_file.read()
    audio_filename = audio_file.filename
    
    data = {
        "audio_bytes": audio_bytes,
        "audio_filename": audio_filename,
        "query_text": query_text,
        "preferred_language": preferred_language,
        "query_formart": query_formart
    }
    return StreamingResponse(process(data, request), media_type="multipart/form-data")
