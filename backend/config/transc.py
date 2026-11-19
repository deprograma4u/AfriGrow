
import torch
import torchaudio
from transformers import Wav2Vec2ForCTC, Wav2Vec2CTCTokenizer, Wav2Vec2Processor
import librosa
import numpy as np

class TwiTranscriber:
    def __init__(self, model_name_or_path):
        """
        Initialize the Twi transcriber with your fine-tuned model
        
        Args:
            model_name_or_path: Your Hugging Face model name (e.g., "your-username/wav2vec2-twi")
                               or local path to downloaded model
        """
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # Load processor, tokenizer, and model
        self.processor = Wav2Vec2Processor.from_pretrained(model_name_or_path)
        self.tokenizer = Wav2Vec2CTCTokenizer.from_pretrained(model_name_or_path)
        self.model = Wav2Vec2ForCTC.from_pretrained(model_name_or_path)
        self.model.to(self.device)
        self.model.eval()
        
    def preprocess_audio(self, audio_path, target_sr=16000):
        """
        Load and preprocess audio file
        
        Args:
            audio_path: Path to audio file
            target_sr: Target sampling rate (wav2vec2 expects 16kHz)
        
        Returns:
            Preprocessed audio array
        """
        # Load audio file
        audio, sr = librosa.load(audio_path, sr=None)
        
        # Resample if necessary
        if sr != target_sr:
            audio = librosa.resample(audio, orig_sr=sr, target_sr=target_sr)
        
        return audio
    
    def transcribe(self, audio_path):
        """
        Transcribe audio file to Twi text
        
        Args:
            audio_path: Path to audio file
            
        Returns:
            Transcribed text
        """
        # Preprocess audio
        audio = self.preprocess_audio(audio_path)
        
        # Process audio with the processor
        inputs = self.processor(
            audio, 
            sampling_rate=16000, 
            return_tensors="pt", 
            padding=True
        )
        
        # Move inputs to device
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        # Perform inference
        with torch.no_grad():
            logits = self.model(**inputs).logits
        
        # Decode predictions
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = self.processor.batch_decode(predicted_ids)[0]
        
        return transcription
    
    def transcribe_batch(self, audio_paths):
        """
        Transcribe multiple audio files
        
        Args:
            audio_paths: List of audio file paths
            
        Returns:
            List of transcriptions
        """
        transcriptions = []
        for audio_path in audio_paths:
            transcription = self.transcribe(audio_path)
            transcriptions.append(transcription)
        return transcriptions

# Usage example
# if __name__ == "__main__":
#     # Replace with your actual model name from Hugging Face
#     MODEL_NAME = "JustKnow/wav2vec2-large-xlsr-twi"  # Update this!
    
#     # Initialize transcriber
#     transcriber = TwiTranscriber(MODEL_NAME)
    
#     # Transcribe single audio file
#     audio_file = "../data/audio.wav"  # Update this path!
    
#     try:
#         transcription = transcriber.transcribe(audio_file)
#         print(f"Transcription: {transcription}")
#     except Exception as e:
#         print(f"Error during transcription: {e}")
    
#     # Transcribe multiple files
#     # audio_files = [
#     #     "path/to/audio1.wav",
#     #     "path/to/audio2.wav",
#     #     "path/to/audio3.wav"
#     # ]
    
#     # try:
#     #     transcriptions = transcriber.transcribe_batch(audio_files)
#     #     for i, transcription in enumerate(transcriptions):
#     #         print(f"File {i+1}: {transcription}")
#     # except Exception as e:
#     #     print(f"Error during batch transcription: {e}")