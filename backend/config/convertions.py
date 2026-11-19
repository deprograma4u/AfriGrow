
from pydub import AudioSegment
import subprocess
import tempfile
import os
from uuid import uuid4
from typing import Optional
import requests
from abenasdk import AbenasClient
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env.local"))

# from config.configSettings import Config


# config = Config()
# config.validate()

# API_KEY = config.get('AB_KEY')
API_KEY = os.getenv("ABENA_API_KEY")
# BASE_URL = "https://abena.mobobi.com/playground/api/v1/asr/transcribe/"

# Initialize client
client = AbenasClient(api_key=API_KEY)


def convertText(text, lang = "tw", length_scale: float = 1.8, noise_scale: float = 0.6, noise_w: float = 0.8):

    # Ensure public audio directory exists
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    audio_dir = os.path.join(base_dir, "audio")
    os.makedirs(audio_dir, exist_ok=True)

    # Create a unique wav filename inside the public audio directory
    filename = f"{uuid4().hex}.wav"
    output_file = os.path.join(audio_dir, filename)

    # text = "Agro yɛ adwuma kɛse wɔ Ghana"
    # output_file = "twi_speech.wav"

    # Resolve model path relative to project base
    # model_path = os.path.join(base_dir, "models", "kasanoma", "model.onnx")
    # if not os.path.isfile(model_path):
    #     raise FileNotFoundError(f"Piper model not found at: {model_path}")

    try:
                
        # Text-to-Speech
        client.tts.synthesize(text, voice="abena", output_file=output_file)

        # result = subprocess.run(
        #     [
        #         "piper",
        #         "-m", str(model_path),
        #         "-f", str(output_file),
        #         "--length_scale", str(length_scale),
        #         "--noise_scale", str(noise_scale),
        #         "--noise_w", str(noise_w),
        #     ],
        #     input=text.encode("utf-8"),
        #     capture_output=True,
        #     check=True
        # )
    except subprocess.CalledProcessError as e:
        stderr = e.stderr.decode("utf-8", errors="ignore") if e.stderr else ""
        stdout = e.stdout.decode("utf-8", errors="ignore") if e.stdout else ""
        # raise RuntimeError(f"piper failed: {stderr or stdout}")
        return False

    # Validate file creation
    if not os.path.isfile(output_file) or os.path.getsize(output_file) == 0:
        # raise RuntimeError("Audio file was not created or is empty.")
        return False

    # Return absolute path to saved audio file
    return output_file


def audioToWave(audio_input, output_path = "../data/audio.wav"):
    audio = AudioSegment.from_file(audio_input)
    audio = audio.set_channels(1).set_frame_rate(16000).set_sample_width(2) # 2 Bytes = 16-bit
    audio.export(output_path, format="wav")
