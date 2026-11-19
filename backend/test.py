
# from groq import Groq
# Install: pip install python-dotenv

import os
from dotenv import load_dotenv
from pathlib import Path

class Config:
    def __init__(self):
        # Load from .env file
        load_dotenv()
        
        # Required keys
        self.required_keys = ['GrocApi_key', 'LLAMA_API']
        
    def get(self, key: str, default: str = None) -> str:
        """Get environment variable"""
        value = os.getenv(key, default)
        if value is None and key in self.required_keys:
            raise ValueError(f"Missing required environment variable: {key}")
        return value
    
    def validate(self):
        """Validate all required environment variables are set"""
        missing = []
        for key in self.required_keys:
            if not os.getenv(key):
                missing.append(key)
        
        if missing:
            raise EnvironmentError(
                f"Missing environment variables: {', '.join(missing)}\n"
                f"Please set them in your .env file or environment."
            )

# Usage
config = Config()
config.validate()

api_key = config.get('GrocApi_key')
api_secret = config.get('LLAMA_API')
debug_mode = config.get('DEBUG', 'False').lower() == 'true'

print(f"API Key: {api_key}")
print(f"API Key: {api_secret}")
print(f"Debug Mode: {debug_mode}")

# ######################
# from dotenv import load_dotenv
# import os

# # Load variables from .env file
# load_dotenv()

# api_key = os.getenv('GrocApi_key')
# # database_url = os.getenv('DATABASE_URL')
# print(api_key)
# ###################

# client = Groq()


# query = "Mepɛ sɛ mimme kookoo, mfuturo bɛne na ɛfata?"

# system_prompt = """
# You are a professional translator specializing in Akan Twi to English translations.  
# Your task is to provide an accurate and exact translation from Akan Twi to English.  

# Context:  
# - The sentences you will be translating are agricultural-based questions and conversations.  
# - Do not add extra explanations, cultural notes, or rephrasing—just return the translation in natural, correct English.  
# - Maintain agricultural terminology as close to the original meaning as possible.  
# - If a Twi word has no direct English equivalent, provide the closest agricultural English term in brackets.  

# Format:  
# Input (Akan Twi): <insert text>  
# Output (English): <exact translation>
# """


# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "system",
#             "content": system_prompt
#         },
#         {
#             "role": "user",
#             "content": query,
#         }
#     ],

#     # The language model which will generate the completion.
#     model="llama-3.3-70b-versatile"
# )

# # Print the completion returned by the LLM.
# print(chat_completion.choices[0].message.content)

# text = "Output (English): I want to plant maize, what type of fertilizer should I use?"
# print(text.split(":")[1])