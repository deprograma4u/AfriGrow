
import subprocess
import os
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env.local"))
import warnings
warnings.filterwarnings("ignore")
from openai import OpenAI

from groq import Groq
# from config.configSettings import Config


# config = Config()
# config.validate()

# API_KEY = config.get('LLAMA_API')
# groc_a =  config.get('GrocApi_key')
API_KEY = os.getenv("OPENROUTER_API_KEY")
groc_a = os.getenv("GROQ_API_KEY")

# model_name="meta-llama/Meta-Llama-3.1-8B-Instruct""

class AgriculturalAdvisor:
    def __init__(self):
        
        print("Loading Generative model...")
        
    def create_agricultural_prompt(self, query, context=None):
        """This ffunction creates a specialized prompt for agricultural queries"""
        system_prompt = """You are an expert agricultural advisor with extensive knowledge in:
        - Crop management and cultivation
        - Soil health and fertilization
        - Pest and disease control
        - Weather and climate considerations
        - Sustainable farming practices
        - Agricultural technology
        Provide practical, actionable advice based on scientific principles and best practices. sumarize the advice into a paragraph with words length of less than 500.And formarted in a way that a"""

        if context:
            user_prompt = f"Context: {context}\n\nQuestion: {query}\n\nProvide detailed agricultural advice:"
        else:
            user_prompt = f"Question: {query}\n\nProvide detailed agricultural advice:"
        
        # Format for LLaMA-3 Instruct
        formatted_prompt = f"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{user_prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"
        
        return formatted_prompt
    
    def generate_advice(self, query, context=None, max_length=512, temperature=0.7):
        """Generate agricultural advice for a given query"""
        # Create the prompt
        print("Creating Prompt!!")
        # prompt = self.create_agricultural_prompt(query, context)

        print("Generating Response...")
        # result = subprocess.run(
        #     ["ollama", "run", "llama3.1:8b"],
        #     input=prompt.encode(), capture_output=True
        # )
        # print("#"*10)
        # response = result.stdout.decode()
        # print("Response: ", response)

                
        # Initialize client with OpenRouter base URL
        # client = OpenAI(
        #     base_url="https://openrouter.ai/api/v1",
        #     api_key=f"{API_KEY}"
        # )
                
        client = Groq(api_key=groc_a)

        system_prompt = """You are an expert agricultural on these crops (Maize, Rice, Tomatoes, Onions, Casava) advisor with extensive knowledge in:
        - Crop management and cultivation
        - Soil health and fertilization
        - Pest and disease control
        - Weather and climate considerations
        - Sustainable farming practices
        - Agricultural technology

        Provide practical, actionable advice based on scientific principles and best practices. 
        Sumarize the advice into a paragraph with characters length of less than 450 character.
        These are some twi to english translation examples (ntose/ntos - Tomatoes), (Aburo - Corn/Maize), (Mmo/ɛmo - Rice), (Bankye - Casava), (Gyeene - Onion)
        If the question is out of the specified crops, response telling the user to ask questions on the crops we only support. 
        If the question is not algricultural based, respond with a message telling the user to ask agric related questions."""

        # Send a chat completion request
        response = client.chat.completions.create(
            # model="meta-llama/llama-3.2-3b-instruct:free",
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"{query}\n\n."}
            ]
        )

        # Print the model's reply
        # print(response.choices[0].message.content)
        
        return response.choices[0].message.content
    
    def batch_generate_advice(self, queries, context_list=None, max_length=512):
        """Generate advice for multiple queries at once"""
        if context_list is None:
            context_list = [None] * len(queries)
        
        responses = []
        for query, context in zip(queries, context_list):
            response = self.generate_advice(query, context, max_length)
            responses.append(response)
        
        return responses

# Example usage and agricultural-specific functions
class CropAdvisor(AgriculturalAdvisor):
    def __init__(self):
        super().__init__()
        
    def diagnose_crop_issue(self, crop_type, symptoms, location=None, season=None):
        """Specialized function for crop issue diagnosis"""
        context = f"Crop: {crop_type}"
        if location:
            context += f", Location: {location}"
        if season:
            context += f", Season: {season}"
        
        query = f"I'm observing the following symptoms in my {crop_type}: {symptoms}. What could be causing this and what should I do?"
        
        return self.generate_advice(query, context)
    
    def get_fertilizer_recommendation(self, crop_type, soil_type, growth_stage, soil_test_results=None):
        """Get fertilizer recommendations"""
        context = f"Crop: {crop_type}, Soil type: {soil_type}, Growth stage: {growth_stage}"
        if soil_test_results:
            context += f", Soil test results: {soil_test_results}"
        
        query = f"What fertilizer program do you recommend for {crop_type} in {soil_type} soil during the {growth_stage} stage?"
        
        return self.generate_advice(query, context)
    
    def get_pest_management_advice(self, crop_type, pest_description, infestation_level):
        """Get pest management advice"""
        context = f"Crop: {crop_type}, Infestation level: {infestation_level}"
        
        query = f"I found {pest_description} on my {crop_type} plants. The infestation appears to be {infestation_level}. What's the best management approach?"
        
        return self.generate_advice(query, context)


# agri = AgriculturalAdvisor()

# # queries = [
# #         #     "How do I prepare soil for planting wheat in spring?",
# #         #     "What's the optimal irrigation schedule for rice cultivation?",
# #         #     "How can I identify and treat fungal diseases in grape vines?"
# #         # ]
# resp = agri.generate_advice("How can I plant corn?")
# print("Response: ", resp)
