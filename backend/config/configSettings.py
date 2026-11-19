
# # from groq import Groq
# # Install: pip install python-dotenv

# import os
# from dotenv import load_dotenv
# from pathlib import Path

# class Config:
#     def __init__(self):
#         # Load from .env file
#         load_dotenv()
        
#         # Required keys
#         self.required_keys = ['GrocApi_key', 'LLAMA_API', 'GH_NLP', 'AB_KEY']
        
#     def get(self, key: str, default: str = None) -> str:
#         """Get environment variable"""
#         value = os.getenv(key, default)
#         if value is None and key in self.required_keys:
#             raise ValueError(f"Missing required environment variable: {key}")
#         return value
    
#     def validate(self):
#         """Validate all required environment variables are set"""
#         missing = []
#         for key in self.required_keys:
#             if not os.getenv(key):
#                 missing.append(key)
        
#         if missing:
#             raise EnvironmentError(
#                 f"Missing environment variables: {', '.join(missing)}\n"
#                 f"Please set them in your .env file or environment."
#             )

# Usage
# config = Config()
# config.validate()

# api_key = config.get('GrocApi_key')
# api_secret = config.get('LLAMA_API')
# debug_mode = config.get('DEBUG', 'False').lower() == 'true'

# print(f"API Key: {api_key}")
# print(f"Debug Mode: {debug_mode}")
