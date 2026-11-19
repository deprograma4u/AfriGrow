
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor

# Download and cache the model locally
model_name = "facebook/nllb-200-distilled-600M"
local_dir = "./twi_model"

processor = Wav2Vec2Processor.from_pretrained(model_name, cache_dir=local_dir)
model = Wav2Vec2ForCTC.from_pretrained(model_name, cache_dir=local_dir)

# Save to specific directory for future offline use
processor.save_pretrained("../models/")
model.save_pretrained("../models/")