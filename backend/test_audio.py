#!/usr/bin/env python3
"""
Test script for audio transcription functionality
"""

import os
import sys
from config.transcription import ASRTranscriber

def test_audio_transcription(audio_path):
    """
    Test the audio transcription with proper error handling
    """
    print(f"Testing audio transcription with file: {audio_path}")
    
    # Check if file exists
    if not os.path.exists(audio_path):
        print(f"❌ Error: Audio file not found: {audio_path}")
        print("Please provide a valid audio file path")
        return False
    
    print(f"✅ Audio file found: {audio_path}")
    
    # Test transcription
    try:
        result = ASRTranscriber(audio_path)
        if result:
            print(f"✅ Transcription successful: {result}")
            return True
        else:
            print("❌ Transcription returned empty result")
            return False
    except Exception as e:
        print(f"❌ Transcription failed with error: {e}")
        return False

if __name__ == "__main__":
    # Example usage - replace with your actual audio file path
    audio_file = "../data/audio.wav"  # Change this to your actual audio file
    
    if len(sys.argv) > 1:
        audio_file = sys.argv[1]
    
    print("Audio Transcription Test")
    print("=" * 30)
    test_audio_transcription(audio_file)
