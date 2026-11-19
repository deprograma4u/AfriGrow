
from typing import Dict, List
from dataclasses import dataclass

@dataclass
class ProcessedQuery:
    original_text: str
    intent: str
    entities: List[Dict]
    confidence: float
    is_agricultural: bool


class KnowledgeBase:
    def __init__(self) -> None:
        pass

    
    def _generate_intent_based_response(self, intent: str, crops: List[str], diseases: List[str], pests: List[str], original_text: str) -> str:
        """Generate response based on specific intent and entities"""
        
        crop_text = f" for {', '.join(crops)}" if crops else ""
        
        if intent == 'crop_disease':
            if diseases:
                return f"For {', '.join(diseases)} disease{crop_text}, I recommend: 1) Remove affected plant parts immediately, 2) Apply appropriate fungicide or treatment, 3) Improve air circulation around plants, 4) Avoid overhead watering. For specific treatment recommendations, consult your local agricultural extension officer."
            else:
                return f"To identify and treat crop diseases{crop_text}: 1) Look for symptoms like yellowing, spots, or wilting, 2) Remove affected parts, 3) Apply preventive treatments, 4) Maintain proper spacing and sanitation. Consider sharing photos with agricultural experts for accurate diagnosis."
        
        elif intent == 'crop_care':
            return f"For proper crop care{crop_text}: 1) Ensure adequate watering (deep, less frequent is better), 2) Apply balanced fertilizer based on soil test, 3) Regular weeding and pest monitoring, 4) Proper spacing for air circulation. Follow recommended practices for your specific crop and region."
        
        elif intent == 'soil_management':
            return f"For effective soil management{crop_text}: 1) Test soil pH and nutrients regularly, 2) Add organic matter like compost, 3) Practice crop rotation, 4) Avoid overworking wet soil, 5) Consider cover crops during off-season. Healthy soil is the foundation of successful farming."
        
        elif intent == 'weather_farming':
            return f"Weather considerations for farming{crop_text}: 1) Plan planting based on seasonal rainfall patterns, 2) Prepare for drought with water conservation, 3) Protect crops from extreme weather, 4) Adjust fertilizer application based on weather forecasts. Monitor local weather closely."
        
        elif intent == 'crop_selection':
            return f"For crop selection{crop_text}: 1) Choose varieties suited to your climate and soil, 2) Consider market demand and prices, 3) Select disease-resistant varieties when available, 4) Plan crop rotation, 5) Start with improved seeds from reliable sources."
        
        elif intent == 'livestock':
            return f"For livestock management: 1) Provide clean water and balanced feed daily, 2) Maintain proper housing and ventilation, 3) Follow vaccination schedules, 4) Monitor animals for signs of illness, 5) Keep accurate records. Consult a veterinarian for health issues."
        
        elif intent == 'market_prices':
            return f"Regarding market prices{crop_text}: 1) Check local market prices regularly, 2) Consider value addition (processing, packaging), 3) Form or join farmer groups for better bargaining power, 4) Time your sales strategically, 5) Diversify crops to spread market risks."
        
        else:  # general_farming
            return f"For general farming advice{crop_text}: 1) Plan your farming activities based on the season, 2) Maintain good agricultural practices, 3) Keep detailed records of inputs and yields, 4) Seek advice from agricultural extension services, 5) Continuously learn about new techniques and technologies."
    
    def generate_response(self, processed_query: ProcessedQuery) -> str:
        """Generate response based on the processed query"""
        if not processed_query.is_agricultural:
            return "I'm sorry, but this doesn't appear to be an agriculture-related question. I can only help with farming, crop management, livestock, and other agricultural topics. Please ask a question about farming or agriculture."
        
        # Get context based on intent and entities
        intent = processed_query.intent
        entities = processed_query.entities
        
        # Extract crop names and other relevant entities
        crops = [e['text'] for e in entities if e['label'] == 'CROP']
        diseases = [e['text'] for e in entities if e['label'] == 'DISEASE']
        pests = [e['text'] for e in entities if e['label'] == 'PEST']
        
        # Generate contextual response based on intent
        response = self._generate_intent_based_response(intent, crops, diseases, pests, processed_query.original_text)
        
        return response