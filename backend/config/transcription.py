from transformers import pipeline
import torchaudio
import torch
import requests
import os
from pydub import AudioSegment

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env.local"))

ABENA_API_KEY = os.getenv("ABENA_API_KEY")

# Initialize client
# client = AbenasClient(api_key=ABENA_API_KEY)

# GhanaNLP

url = "https://translation-api.ghananlp.org/asr/v1/transcribe?language=tw"   # example ASR endpoint
api_key = os.getenv("GHANANLP_API_KEY")

headers = {
    "Content-Type": "audio/mpeg",   # or "audio/wav" if using wav
    "Cache-Control": "no-cache",
    "Ocp-Apim-Subscription-Key": api_key   # or secondary key
}

def preprocessAudio(audio_path):
    try:
        # Ensuring file is WAV, mono, 16kHz
        file_extension = os.path.splitext(audio_path)[1].lower()

        if file_extension != ".wav":
            print(f"Converting {file_extension} file to WAV format...")
            audio = AudioSegment.from_file(audio_path)
            wav_path = os.path.splitext(audio_path)[0] + ".wav"
            # Converting to mono + 16kHz
            audio = audio.set_frame_rate(16000).set_channels(1)
            audio.export(wav_path, format="wav")
            audio_path = wav_path
            print(f"Converted to: {wav_path}")
        else:
            # Still enforcing mono + 16kHz for existing WAV
            audio = AudioSegment.from_file(audio_path)
            audio = audio.set_frame_rate(16000).set_channels(1)
            audio.export(audio_path, format="wav")

        return audio_path  # returning path

        # Check if the file is already in WAV format
        # file_extension = os.path.splitext(audio_path)[1].lower()
        
        # if file_extension != '.wav':
        #     # Convert to WAV format
        #     print(f"Converting {file_extension} file to WAV format...")
        #     audio = AudioSegment.from_file(audio_path)
        #     wav_path = os.path.splitext(audio_path)[0] + '.wav'
        #     audio.export(wav_path, format="wav")
        #     audio_path = wav_path
        #     print(f"Converted to: {wav_path}")
        
        # # Load audio file
        # waveform, sample_rate = torchaudio.load(audio_path)

        # # Convert to mono if stereo
        # if waveform.shape[0] > 1:
        #     waveform = torch.mean(waveform, dim=0, keepdim=True)
        
        # # Resample to 16kHz if necessary
        # if sample_rate != 16000:
        #     resampler = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)
        #     waveform = resampler(waveform)
        
        # # Extract features
        # speech = waveform.squeeze().numpy()
        
        # return speech


    except Exception as e:
        print("Error Conv Audio: ", e)
        return None

def ASRTranscriber(audio_path):
    try:
        speech = preprocessAudio(audio_path)
        
        # Check if preprocessing was successful
        if speech is None:
            print("Audio preprocessing failed")
            return ""

        # GhanaNLP 
        transcription = ""
        with open(speech, "rb") as f:   # change to .wav if needed
            audio_data = f.read()
            
        response = requests.post(url, headers=headers, data=audio_data)
        # print("Result: ", response)
        print("Trans: ", response.json())
        if response.status_code == 200:
            transcription = response.json()

        else:
            print("Error:", response.status_code, response.text)

        # Abena Ai
                
        # Speech Recognition - Use the actual audio_path, not hardcoded "audio.wav"
        # result = client.asr.transcribe(audio_path, language="en")
        # print(f"📝 Transcription: {result}")

        # transcription = result["text"]

        # #######
        # ASR MODEL on HuggingFace
        # This model was fine-tuned for Twi on the Common Voice dataset
        # model_name = "dkt-py-bot/Whisper-FineTuned-DL-Twi"
        # model_name = "femursmith/final-asr-ashanti-twi"

        # Determine the device for computation (GPU if available, otherwise CPU)
        # device = "cuda:0" if torch.cuda.is_available() else "cpu"

        # Loading the ASR (Automatic Speech Recognition) pipeline
        # The pipeline handles all the preprocessing and model loading
        # twi_transcriber = pipeline(
        #     "automatic-speech-recognition", 
        #     model=model_name, 
        #     device=device
        # )
        # transcription = h_client.automatic_speech_recognition(
        #     model=model_name, 
        #     audio=speech
        # )

        # Transcribe the audio file
        # transcription = twi_transcriber(speech)

        return transcription

    except Exception as e:
        print(f"Error In Transcription: {e}")
        return ""
