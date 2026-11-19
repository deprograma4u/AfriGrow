# from transformers import (
#     AutoTokenizer, AutoModelForSequenceClassification, 
#     AutoModelForTokenClassification, pipeline,
#     BertTokenizer, BertForSequenceClassification
# )
# import torch
# import re
# from typing import Dict, List, Tuple, Optional
# import logging
# from dataclasses import dataclass

# @dataclass
# class ProcessedQuery:
#     original_text: str
#     intent: str
#     entities: List[Dict]
#     confidence: float
#     is_agricultural: bool

# class AgriculturalNLP:
#     def __init__(self):
#         """Initialize the Agricultural NLP system with BERT models"""
#         self.setup_logging()
#         self.load_models()
#         self.setup_intent_categories()
#         self.setup_entity_patterns()
    
#     def setup_logging(self):
#         logging.basicConfig(level=logging.INFO)
#         self.logger = logging.getLogger(__name__)
    
#     def load_models(self):
#         """Load the Agriculture BERT model and other NLP models"""
#         try:
#             # Load the Agriculture BERT model from HuggingFace
#             model_name = "recobo/agriculture-bert-uncased"
#             self.agri_tokenizer = AutoTokenizer.from_pretrained(model_name)
#             self.agri_model = AutoModelForSequenceClassification.from_pretrained(model_name)
            
#             # Create classification pipeline
#             self.agri_classifier = pipeline(
#                 "text-classification",
#                 model=self.agri_model,
#                 tokenizer=self.agri_tokenizer,
#                 device=0 if torch.cuda.is_available() else -1
#             )
            
#             # Load NER model for entity extraction
#             self.ner_pipeline = pipeline(
#                 "ner",
#                 model="dbmdz/bert-large-cased-finetuned-conll03-english",
#                 aggregation_strategy="simple"
#             )
            
#             self.logger.info("Models loaded successfully")
            
#         except Exception as e:
#             self.logger.error(f"Error loading models: {str(e)}")
#             raise
    
#     def setup_intent_categories(self):
#         """Define agricultural intent categories"""
#         self.agricultural_intents = {
#             'crop_disease': ['disease', 'pest', 'infection', 'fungus', 'bacteria', 'virus'],
#             'crop_care': ['fertilizer', 'watering', 'irrigation', 'pruning', 'harvesting'],
#             'soil_management': ['soil', 'ph', 'nutrients', 'compost', 'fertilizer'],
#             'weather_farming': ['weather', 'rain', 'drought', 'season', 'climate'],
#             'crop_selection': ['variety', 'cultivar', 'seed', 'planting', 'growing'],
#             'livestock': ['cattle', 'chicken', 'goat', 'sheep', 'pig', 'animal'],
#             'market_prices': ['price', 'market', 'sell', 'buy', 'cost', 'profit'],
#             'general_farming': ['farm', 'agriculture', 'farming', 'crop', 'yield']
#         }
        
#         # Agricultural keywords for validation
#         self.agri_keywords = set()
#         for intent_words in self.agricultural_intents.values():
#             self.agri_keywords.update(intent_words)
        
#         # Extended agricultural vocabulary
#         extended_agri_terms = [
#             'maize', 'corn', 'rice', 'wheat', 'cassava', 'yam', 'plantain', 'cocoa',
#             'tomato', 'pepper', 'onion', 'cabbage', 'lettuce', 'carrot',
#             'farming', 'agriculture', 'cultivation', 'harvest', 'planting',
#             'fertilizer', 'pesticide', 'herbicide', 'irrigation', 'drought',
#             'rainfall', 'season', 'organic', 'sustainable'
#         ]
#         self.agri_keywords.update(extended_agri_terms)
    
#     def setup_entity_patterns(self):
#         """Setup patterns for agricultural entity extraction"""
#         self.agri_entity_patterns = {
#             'CROP': r'\b(maize|corn|rice|wheat|cassava|yam|plantain|cocoa|tomato|pepper|onion|cabbage|lettuce|carrot)\b',
#             'DISEASE': r'\b(blight|rust|wilt|rot|mildew|mosaic|spot|canker)\b',
#             'PEST': r'\b(aphid|weevil|borer|caterpillar|termite|locust|beetle)\b',
#             'FERTILIZER': r'\b(npk|urea|compost|manure|organic|fertilizer)\b',
#             'SEASON': r'\b(dry|wet|rainy|harmattan|planting|harvest)\b',
#             'MEASUREMENT': r'\b(\d+\s*(kg|tons?|hectares?|acres?|meters?|cm|mm))\b'
#         }
    
#     def validate_agricultural_question(self, text: str) -> Tuple[bool, float]:
#         """Validate if the question is agriculture-related"""
#         text_lower = text.lower()
        
#         # Check for agricultural keywords
#         keyword_matches = sum(1 for keyword in self.agri_keywords if keyword in text_lower)
#         keyword_score = min(keyword_matches / 3.0, 1.0)  # Normalize to max 1.0
        
#         # Use the agriculture BERT model for classification
#         try:
#             result = self.agri_classifier(text)
#             if isinstance(result, list):
#                 result = result[0]
            
#             # Assuming the model outputs agricultural vs non-agricultural classification
#             bert_confidence = result.get('score', 0.0)
#             is_agricultural_bert = result.get('label', '').upper() in ['AGRICULTURAL', 'LABEL_1', '1']
            
#         except Exception as e:
#             self.logger.warning(f"BERT classification failed: {str(e)}")
#             bert_confidence = 0.0
#             is_agricultural_bert = False
        
#         # Combine scores
#         combined_score = (keyword_score * 0.4) + (bert_confidence * 0.6)
#         is_agricultural = (keyword_score > 0.1) or (is_agricultural_bert and bert_confidence > 0.7)
        
#         return is_agricultural, combined_score
    
#     def extract_intent(self, text: str) -> Tuple[str, float]:
#         """Extract the main intent from the agricultural question"""
#         text_lower = text.lower()
        
#         intent_scores = {}
        
#         for intent, keywords in self.agricultural_intents.items():
#             score = sum(1 for keyword in keywords if keyword in text_lower)
#             if score > 0:
#                 intent_scores[intent] = score / len(keywords)
        
#         if not intent_scores:
#             return 'general_farming', 0.5
        
#         best_intent = max(intent_scores.items(), key=lambda x: x[1])
#         return best_intent[0], best_intent[1]
    
#     def extract_entities(self, text: str) -> List[Dict]:
#         """Extract entities from the text using NER and pattern matching"""
#         entities = []
        
#         # Use BERT NER for general entities
#         try:
#             ner_results = self.ner_pipeline(text)
#             for entity in ner_results:
#                 entities.append({
#                     'text': entity['word'],
#                     'label': entity['entity_group'],
#                     'confidence': entity['score'],
#                     'start': entity.get('start', 0),
#                     'end': entity.get('end', 0)
#                 })
#         except Exception as e:
#             self.logger.warning(f"NER extraction failed: {str(e)}")
        
#         # Extract agricultural-specific entities using patterns
#         for entity_type, pattern in self.agri_entity_patterns.items():
#             matches = re.finditer(pattern, text, re.IGNORECASE)
#             for match in matches:
#                 entities.append({
#                     'text': match.group(),
#                     'label': entity_type,
#                     'confidence': 0.9,
#                     'start': match.start(),
#                     'end': match.end()
#                 })
        
#         return entities
    
#     def generate_response(self, processed_query: ProcessedQuery) -> str:
#         """Generate response based on the processed query"""
#         if not processed_query.is_agricultural:
#             return "I'm sorry, but this doesn't appear to be an agriculture-related question. I can only help with farming, crop management, livestock, and other agricultural topics. Please ask a question about farming or agriculture."
        
#         # Get context based on intent and entities
#         intent = processed_query.intent
#         entities = processed_query.entities
        
#         # Extract crop names and other relevant entities
#         crops = [e['text'] for e in entities if e['label'] == 'CROP']
#         diseases = [e['text'] for e in entities if e['label'] == 'DISEASE']
#         pests = [e['text'] for e in entities if e['label'] == 'PEST']
        
#         # Generate contextual response based on intent
#         response = self._generate_intent_based_response(intent, crops, diseases, pests, processed_query.original_text)
        
#         return response
    
#     def _generate_intent_based_response(self, intent: str, crops: List[str], diseases: List[str], pests: List[str], original_text: str) -> str:
#         """Generate response based on specific intent and entities"""
        
#         crop_text = f" for {', '.join(crops)}" if crops else ""
        
#         if intent == 'crop_disease':
#             if diseases:
#                 return f"For {', '.join(diseases)} disease{crop_text}, I recommend: 1) Remove affected plant parts immediately, 2) Apply appropriate fungicide or treatment, 3) Improve air circulation around plants, 4) Avoid overhead watering. For specific treatment recommendations, consult your local agricultural extension officer."
#             else:
#                 return f"To identify and treat crop diseases{crop_text}: 1) Look for symptoms like yellowing, spots, or wilting, 2) Remove affected parts, 3) Apply preventive treatments, 4) Maintain proper spacing and sanitation. Consider sharing photos with agricultural experts for accurate diagnosis."
        
#         elif intent == 'crop_care':
#             return f"For proper crop care{crop_text}: 1) Ensure adequate watering (deep, less frequent is better), 2) Apply balanced fertilizer based on soil test, 3) Regular weeding and pest monitoring, 4) Proper spacing for air circulation. Follow recommended practices for your specific crop and region."
        
#         elif intent == 'soil_management':
#             return f"For effective soil management{crop_text}: 1) Test soil pH and nutrients regularly, 2) Add organic matter like compost, 3) Practice crop rotation, 4) Avoid overworking wet soil, 5) Consider cover crops during off-season. Healthy soil is the foundation of successful farming."
        
#         elif intent == 'weather_farming':
#             return f"Weather considerations for farming{crop_text}: 1) Plan planting based on seasonal rainfall patterns, 2) Prepare for drought with water conservation, 3) Protect crops from extreme weather, 4) Adjust fertilizer application based on weather forecasts. Monitor local weather closely."
        
#         elif intent == 'crop_selection':
#             return f"For crop selection{crop_text}: 1) Choose varieties suited to your climate and soil, 2) Consider market demand and prices, 3) Select disease-resistant varieties when available, 4) Plan crop rotation, 5) Start with improved seeds from reliable sources."
        
#         elif intent == 'livestock':
#             return f"For livestock management: 1) Provide clean water and balanced feed daily, 2) Maintain proper housing and ventilation, 3) Follow vaccination schedules, 4) Monitor animals for signs of illness, 5) Keep accurate records. Consult a veterinarian for health issues."
        
#         elif intent == 'market_prices':
#             return f"Regarding market prices{crop_text}: 1) Check local market prices regularly, 2) Consider value addition (processing, packaging), 3) Form or join farmer groups for better bargaining power, 4) Time your sales strategically, 5) Diversify crops to spread market risks."
        
#         else:  # general_farming
#             return f"For general farming advice{crop_text}: 1) Plan your farming activities based on the season, 2) Maintain good agricultural practices, 3) Keep detailed records of inputs and yields, 4) Seek advice from agricultural extension services, 5) Continuously learn about new techniques and technologies."
    
#     def process_query(self, text: str) -> ProcessedQuery:
#         """Main method to process a user query"""
#         try:
#             # Validate if it's agricultural
#             is_agricultural, agri_confidence = self.validate_agricultural_question(text)
            
#             # Extract intent
#             intent, intent_confidence = self.extract_intent(text)
            
#             # Extract entities
#             entities = self.extract_entities(text)
            
#             # Create processed query object
#             processed_query = ProcessedQuery(
#                 original_text=text,
#                 intent=intent,
#                 entities=entities,
#                 confidence=min(agri_confidence, intent_confidence),
#                 is_agricultural=is_agricultural
#             )
            
#             return processed_query
            
#         except Exception as e:
#             self.logger.error(f"Error processing query: {str(e)}")
#             # Return a safe fallback
#             return ProcessedQuery(
#                 original_text=text,
#                 intent='general_farming',
#                 entities=[],
#                 confidence=0.0,
#                 is_agricultural=False
#             )

# # Flask API endpoints for your backend
# from flask import Flask, request, jsonify

# # app = Flask(__name__)
# nlp_system = AgriculturalNLP()

# # @app.route('/process_question', methods=['POST'])
# def process_agricultural_question():
#     """API endpoint to process agricultural questions"""
#     try:
#         data = request.json
#         question_text = data.get('question', '')
        
#         if not question_text:
#             return jsonify({'error': 'No question provided'}), 400
        
#         # Process the query
#         processed_query = nlp_system.process_query(question_text)
        
#         # Generate response
#         response = nlp_system.generate_response(processed_query)
        
#         return jsonify({
#             'original_question': question_text,
#             'is_agricultural': processed_query.is_agricultural,
#             'intent': processed_query.intent,
#             'entities': processed_query.entities,
#             'confidence': processed_query.confidence,
#             'response': response,
#             'status': 'success'
#         })
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 500

# # @app.route('/validate_agricultural_question', methods=['POST'])
# def validate_question():
#     """Endpoint to only validate if question is agricultural"""
#     try:
#         data = request.json
#         question_text = data.get('question', '')
        
#         is_agricultural, confidence = nlp_system.validate_agricultural_question(question_text)
        
#         return jsonify({
#             'is_agricultural': is_agricultural,
#             'confidence': confidence,
#             'status': 'success'
#         })
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 500

# # if __name__ == '__main__':
# #     app.run(debug=True, host='0.0.0.0', port=5000)