
import spacy
from spacy.matcher import Matcher, PhraseMatcher
from spacy.tokens import Span
import re
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from enum import Enum

class Intent(Enum):
    """Agricultural advisory intents"""
    CROP_DISEASE = "crop_disease"
    PEST_CONTROL = "pest_control"
    FERTILIZER_ADVICE = "fertilizer_advice"
    IRRIGATION = "irrigation"
    PLANTING_TIME = "planting_time"
    HARVEST_TIME = "harvest_time"
    SOIL_HEALTH = "soil_health"
    WEATHER_CONCERN = "weather_concern"
    MARKET_PRICE = "market_price"
    CROP_ROTATION = "crop_rotation"
    SEED_SELECTION = "seed_selection"
    GENERAL_INQUIRY = "general_inquiry"

@dataclass
class ExtractedEntity:
    """Represents an extracted entity with its metadata"""
    text: str
    label: str
    start: int
    end: int
    confidence: float = 1.0

@dataclass
class ExtractionResult:
    """Complete extraction result containing intent and entities"""
    text: str
    intent: Intent
    confidence: float
    entities: List[ExtractedEntity]

class AgriculturalNLP:
    """Agricultural NLP pipeline for intent and entity extraction"""
    
    def __init__(self, model_name: str = "en_core_web_sm"):
        """Initializing the NLP pipeline"""
        try:
            print("Loading Spacy Model")
            self.nlp = spacy.load(model_name)
        except OSError:
            print(f"Model {model_name} not found. Please install it using:")
            print(f"python -m spacy download {model_name}")
            raise
        
        # Initializing matchers
        self.matcher = Matcher(self.nlp.vocab)
        self.phrase_matcher = PhraseMatcher(self.nlp.vocab, attr="LOWER")
        
        # Setup custom entity labels
        self._setup_entity_labels()
        
        # Setup intent patterns
        self._setup_intent_patterns()
        
        # Setup entity extraction patterns
        self._setup_entity_patterns()
    
    def _setup_entity_labels(self):
        """Setup custom entity labels for agricultural domain"""
        self.entity_labels = {
            "CROP": "Crop or plant type",
            "DISEASE": "Plant disease",
            "PEST": "Pest or insect",
            "FERTILIZER": "Fertilizer type",
            "NUTRIENT": "Plant nutrient",
            "SEASON": "Growing season",
            "SOIL_TYPE": "Soil classification",
            "WEATHER": "Weather condition",
            "TOOL": "Agricultural tool or equipment",
            "LOCATION": "Geographical location",
            "TIME_PERIOD": "Time duration or period"
        }
        
        # Adding custom entity labels to spaCy pipeline
        for label in self.entity_labels:
            if label not in self.nlp.get_pipe("ner").labels:
                self.nlp.get_pipe("ner").add_label(label)
    
    def _setup_intent_patterns(self):
        """Seting up pattern matching for intent classification"""
        self.intent_patterns = {
            Intent.CROP_DISEASE: [
                ["disease", "in"], ["sick", "crop"], ["yellowing", "leaves"],
                ["brown", "spots"], ["fungal", "infection"], ["bacterial"],
                ["virus"], ["blight"], ["rot"], ["wilt"], ["mold"],
                ["what", "wrong", "with"], ["plant", "sick"], ["leaves", "dying"]
            ],
            Intent.PEST_CONTROL: [
                ["pest", "control"], ["insect", "problem"], ["bugs", "eating"],
                ["caterpillar"], ["aphids"], ["termites"], ["locust"],
                ["spray", "for"], ["pesticide"], ["insecticide"],
                ["how", "kill"], ["get", "rid", "of"]
            ],
            Intent.FERTILIZER_ADVICE: [
                ["fertilizer"], ["nutrient"], ["nitrogen"], ["phosphorus"],
                ["potassium"], ["NPK"], ["manure"], ["compost"],
                ["feed", "plant"], ["plant", "food"], ["soil", "nutrients"]
            ],
            Intent.IRRIGATION: [
                ["water"], ["irrigation"], ["watering"], ["drought"],
                ["when", "water"], ["how", "much", "water"], ["drip"],
                ["sprinkler"], ["rain"], ["moisture"]
            ],
            Intent.PLANTING_TIME: [
                ["when", "plant"], ["planting", "time"], ["sowing"],
                ["seed", "time"], ["best", "time", "plant"], ["season", "plant"]
            ],
            Intent.HARVEST_TIME: [
                ["harvest"], ["when", "harvest"], ["ready", "harvest"],
                ["maturity"], ["ripe"], ["picking", "time"]
            ],
            Intent.SOIL_HEALTH: [
                ["soil", "test"], ["soil", "health"], ["pH"], ["soil", "quality"],
                ["soil", "preparation"], ["soil", "type"], ["clay"], ["sand"],
                ["loam"], ["acidic"], ["alkaline"]
            ],
            Intent.WEATHER_CONCERN: [
                ["weather"], ["rain"], ["drought"], ["frost"], ["hail"],
                ["storm"], ["wind"], ["temperature"], ["climate"]
            ],
            Intent.MARKET_PRICE: [
                ["price"], ["market"], ["sell"], ["cost"], ["profit"],
                ["demand"], ["export"], ["local", "market"]
            ],
            Intent.CROP_ROTATION: [
                ["rotation"], ["next", "crop"], ["what", "plant", "next"],
                ["alternate", "crop"], ["crop", "sequence"]
            ],
            Intent.SEED_SELECTION: [
                ["seed", "variety"], ["which", "seed"], ["best", "variety"],
                ["hybrid"], ["improved", "seed"], ["seed", "quality"]
            ]
        }
    
    def _setup_entity_patterns(self):
        """Seting up entity extraction patterns"""
        # Common crops
        crops = [
            "maize", "corn", "rice", "wheat", "barley", "sorghum", "millet",
            "cassava", "yam", "plantain", "banana", "cocoa", "coffee",
            "tomato", "pepper", "onion", "cabbage", "lettuce", "carrot",
            "beans", "cowpea", "groundnut", "soybean", "cotton", "sugarcane"
        ]
        
        # Common diseases
        diseases = [
            "blight", "rust", "wilt", "rot", "mold", "mildew", "scab",
            "leaf spot", "stem borer", "black rot", "bacterial wilt",
            "fusarium wilt", "anthracnose", "powdery mildew"
        ]
        
        # Common pests
        pests = [
            "aphid", "caterpillar", "locust", "termite", "mite", "thrips",
            "whitefly", "armyworm", "bollworm", "cutworm", "nematode",
            "weevil", "borer", "leafhopper"
        ]
        
        # Fertilizers and nutrients
        fertilizers = [
            "NPK", "urea", "phosphate", "potash", "compost", "manure",
            "nitrogen", "phosphorus", "potassium", "calcium", "magnesium",
            "sulfur", "organic fertilizer", "chemical fertilizer"
        ]
        
        # Setup phrase matchers
        crop_patterns = [self.nlp(crop) for crop in crops]
        disease_patterns = [self.nlp(disease) for disease in diseases]
        pest_patterns = [self.nlp(pest) for pest in pests]
        fertilizer_patterns = [self.nlp(fert) for fert in fertilizers]
        
        self.phrase_matcher.add("CROP", crop_patterns)
        self.phrase_matcher.add("DISEASE", disease_patterns)
        self.phrase_matcher.add("PEST", pest_patterns)
        self.phrase_matcher.add("FERTILIZER", fertilizer_patterns)
        
        # Seting up regex patterns for specific entities
        self.regex_patterns = {
            "TIME_PERIOD": r'\b(\d+\s*(days?|weeks?|months?|years?))\b',
            "SEASON": r'\b(rainy|dry|wet|harmattan|planting|harvest)\s*season\b',
            "SOIL_TYPE": r'\b(clay|sandy|loam|laterite|alluvial)\s*soil\b'
        }
    
    def extract_entities(self, doc) -> List[ExtractedEntity]:
        """Extract entities from spaCy doc"""
        entities = []
        
        # Extract named entities from spaCy's NER
        for ent in doc.ents:
            if ent.label_ in ["GPE", "LOC"]:  # Geographic entities
                entities.append(ExtractedEntity(
                    text=ent.text,
                    label="LOCATION",
                    start=ent.start_char,
                    end=ent.end_char
                ))
        
        # Extract entities using phrase matcher
        matches = self.phrase_matcher(doc)
        for match_id, start, end in matches:
            label = self.nlp.vocab.strings[match_id]
            span = doc[start:end]
            entities.append(ExtractedEntity(
                text=span.text,
                label=label,
                start=span.start_char,
                end=span.end_char
            ))
        
        # Extract entities using regex patterns
        text = doc.text
        for label, pattern in self.regex_patterns.items():
            for match in re.finditer(pattern, text, re.IGNORECASE):
                entities.append(ExtractedEntity(
                    text=match.group(),
                    label=label,
                    start=match.start(),
                    end=match.end()
                ))
        
        return entities
    
    def classify_intent(self, doc) -> Tuple[Intent, float]:
        """Classify intent based on text patterns"""
        text_lower = doc.text.lower()
        tokens = [token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct]
        
        intent_scores = {}
        
        for intent, patterns in self.intent_patterns.items():
            score = 0
            for pattern in patterns:
                if isinstance(pattern, list):
                    # Check if all words in pattern exist in tokens
                    pattern_words = [word.lower() for word in pattern]
                    if all(word in text_lower for word in pattern_words):
                        # Bonus for consecutive words
                        if ' '.join(pattern_words) in text_lower:
                            score += 2
                        else:
                            score += 1
                else:
                    if pattern.lower() in text_lower:
                        score += 1
            
            if score > 0:
                intent_scores[intent] = score
        
        if intent_scores:
            best_intent = max(intent_scores, key=intent_scores.get)
            confidence = min(intent_scores[best_intent] / 3.0, 1.0)  # Normalize confidence
            return best_intent, confidence
        
        return Intent.GENERAL_INQUIRY, 0.5
    
    def process(self, text: str) -> ExtractionResult:
        """Process text and extract intent and entities"""
        # Clean and preprocess text
        text = text.strip()
        doc = self.nlp(text)
        
        # Extract intent
        intent, intent_confidence = self.classify_intent(doc)
        
        # Extract entities
        entities = self.extract_entities(doc)
        
        # Remove duplicate entities (keep the one with highest confidence)
        unique_entities = []
        seen_spans = set()
        
        for entity in entities:
            span_key = (entity.start, entity.end, entity.label)
            if span_key not in seen_spans:
                seen_spans.add(span_key)
                unique_entities.append(entity)
        
        return ExtractionResult(
            text=text,
            intent=intent,
            confidence=intent_confidence,
            entities=unique_entities
        )
    
    def batch_process(self, texts: List[str]) -> List[ExtractionResult]:
        """Process multiple texts efficiently"""
        return [self.process(text) for text in texts]


# intentor = AgriculturalNLP()
# print(intentor.process("How can I plant corn?"))
