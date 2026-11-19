# from typing import Union
# from fastapi import FastAPI, Request, UploadFile
# from fastapi.staticfiles import StaticFiles
# from fastapi.middleware.cors import CORSMiddleware
# import os
# from pydantic import BaseModel

# from fastapi.responses import StreamingResponse
# import json, asyncio

# from config.convertions import convertText

# app = FastAPI()

# # Mount static directory to serve generated audio files
# base_dir = os.path.abspath(os.path.dirname(__file__))
# audio_dir = os.path.join(base_dir, "audio")
# os.makedirs(audio_dir, exist_ok=True)
# app.mount("/audio", StaticFiles(directory=audio_dir), name="audio")

# # Enable CORS for development (adjust origins for production)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class QueryRequest(BaseModel):
#     audio_file: UploadFile
#     query_text: str
#     prefered_language: str
#     query_formart: str

# @app.get("/")
# def read_root():
#     print("In....")
#     return {"Hello": "Word"}


# async def event_generator():
#     for i in range(5):
#         print("In ", i)
#         if (i == 2):
#             yield f"{json.dumps({'step': i, 'event': 'error', 'message': 'Error Transcribing'})}\n\n"
#             return
#         yield f"{json.dumps({'step': i, 'event': f'Step {i}'})}\n\n"
#         await asyncio.sleep(1)
#     yield f"{json.dumps({'status': 'done'})}\n\n"

# @app.post("/process")
# async def process():
#     return StreamingResponse(event_generator(), media_type="text/event-stream")



# @app.post("/convert")
# async def convertToText(request: Request):
#     print("converting...")
#     data = await request.json()
#     lang = data.get("prefered_language")
#     query_text = data.get("query_text")
#     length_scale = float(data.get("length_scale", 1.7))
#     noise_scale = float(data.get("noise_scale", 0.7))
#     noise_w = float(data.get("noise_w", 0.8))

#     print("Receivvevd: ", lang, " and ", query_text)

#     aud_file = convertText(query_text, lang, length_scale, noise_scale, noise_w)

#     if not aud_file:
#         return False

#     # Build public URL for the generated file
#     filename = os.path.basename(aud_file)
#     base_url = str(request.base_url).rstrip('/')
#     public_url = f"{base_url}/audio/{filename}"

#     return {"audio_url": public_url}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}