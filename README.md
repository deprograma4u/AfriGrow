# AfriGrow

AfriGrow is a voice-first farming assistant for Ghanaian farmers. A farmer can ask a question out loud in **Twi** (or type it in English or Twi) and hear the answer read back in Twi.

The app covers five crops: **maize, rice, tomatoes, onions and cassava**.

It has two parts:

| Folder | What it is |
|---|---|
| [`frontend/`](frontend/) | Mobile app built with Expo (React Native) |
| [`backend/`](backend/) | Python FastAPI server that runs the voice and AI pipeline |

---

## Features

- **Voice chatbot.** Record a question in Twi and get spoken advice back in Twi, with progress updates while it is processed.
- **Weather.** Shows the local forecast based on the device's location.
- **Crop library.** Growing guides for each supported crop.
- **Farming tips.** Short articles on composting, crop rotation and similar practices.
- **Crop scanner.** Take or upload a photo of a crop. *This screen currently shows sample results from mock data; real image analysis is not connected yet.*
- **English / Twi interface** with light and dark themes.

## How a question is answered

`POST /process` streams back a status update after each step:

```
Twi audio ──► 1. Speech-to-text         (GhanaNLP ASR)
          ──► 2. Translate Twi → English (DeepSeek)
          ──► 3. Check it's a farming question (spaCy intent detection)
          ──► 4. Generate advice         (Groq · Llama 3.3 70B)
          ──► 5. Translate English → Twi (DeepSeek)
          ──► 6. Text-to-speech          (Abena AI)
          ──► audio URL returned to the app
```

## Tech stack

**Frontend:** Expo SDK 53, Expo Router, React 19, NativeWind, expo-audio, expo-location, axios

**Backend:** FastAPI, spaCy, pydub, plus SDKs for Groq, OpenAI (used to call DeepSeek) and Abena

---

## Getting started

### Prerequisites

- Python 3.10+
- Node.js 18+ and npm
- [FFmpeg](https://ffmpeg.org/download.html) on your `PATH` (pydub uses it to convert audio)
- The **Expo Go** app on your phone, or an Android or iOS emulator
- API keys for: [Groq](https://console.groq.com), [DeepSeek](https://platform.deepseek.com), [GhanaNLP](https://translation.ghananlp.org), [Abena AI](https://abena.mobobi.com) and [WeatherAPI](https://www.weatherapi.com)

### 1. Backend

```bash
cd backend
python -m venv .virt

# Windows
.virt\Scripts\activate
# macOS / Linux
source .virt/bin/activate

pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

Create your env file from the template and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Used for |
|---|---|
| `GROQ_API_KEY` | Generating advice (Llama 3.3) |
| `DEEPSEEK_API_KEY` | Twi ↔ English translation |
| `GHANANLP_API_KEY` | Twi speech-to-text |
| `ABENA_API_KEY` | Twi text-to-speech |
| `OPENROUTER_API_KEY` | Optional. Alternative LLM provider, not used by default |

Start the server so your phone can reach it over the local network:

```bash
uvicorn main:app --host 0.0.0.0 --port 8002 --reload
```

Open `http://localhost:8002/`. You should see `"API running..."`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # then add EXPO_PUBLIC_WEATHER_API_KEY
```

**Point the app at your backend.** The server address is currently hardcoded. Change `192.168.0.159` to your computer's local IP address in these files:

- `app/(tabs)/chatbot.tsx`
- `components/PlayButton.tsx`
- `components/TextWithPlay.tsx`

Then start the app:

```bash
npm start
```

Scan the QR code with Expo Go. Your phone and computer must be on the same Wi-Fi network.

---

## API reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/process` | Multipart form fields: `audio_file`, `query_text`, `preferred_language`, `query_formart` (`audio` or `text`). Streams back JSON status events; the final event has `status: "done"` and an `audio_url`. |
| `POST` | `/convertTextToAudio` | Converts text to Twi speech and returns the audio URL |
| `GET` | `/audio/{file}` | Serves generated audio files |

## Project structure

```
afrigrow/
├── backend/
│   ├── main.py              # FastAPI app and the /process pipeline
│   ├── config/
│   │   ├── transcription.py # Speech-to-text (GhanaNLP)
│   │   ├── translation.py   # Twi ↔ English (DeepSeek)
│   │   ├── intent.py        # Farming-question detection (spaCy)
│   │   ├── generation.py    # Advice generation (Groq)
│   │   └── convertions.py   # Text-to-speech (Abena)
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── app/                 # Screens (Expo Router)
    │   └── (tabs)/          # Home, Chatbot, Profile
    ├── components/          # Shared UI components
    ├── store/               # App, language and theme state
    ├── mocks/               # Sample crop, tip and analysis data
    └── .env.example
```

## Notes

- **Never commit `.env.local` files.** They are already in `.gitignore`.
- `backend/models/` is not tracked. It holds an optional local Piper TTS voice (`kasanoma/model.onnx`) left over from an earlier offline setup; the current pipeline uses Abena AI instead and does not need it.
- The notebook `backend/whisperTwiFineTunned.ipynb` contains experiments fine-tuning Whisper for Twi speech recognition.

## Roadmap

- [ ] Move the backend URL into an environment variable
- [ ] Connect the crop scanner to a real disease-detection model
- [ ] Support more crops and languages

---

## Open source: use it, build on it

AfriGrow is open source. Anyone is welcome to download it, learn from it, change it and build their own projects on top of it, including commercial ones. You could add more crops, support another local language, plug in a different AI model, or adapt it for farmers in another country.

**Ways to get involved:**

- **Build your own version.** Fork the repo or download it, then follow [Getting started](#getting-started).
- **Contribute back.** Open a pull request with a fix or a new feature. The [Roadmap](#roadmap) lists good places to start.
- **Report a problem or suggest an idea.** Open an [issue](https://github.com/deprograma4u/AfriGrow/issues).

To contribute:

```bash
git clone https://github.com/deprograma4u/AfriGrow.git
cd AfriGrow
git checkout -b my-feature
# make your changes, then:
git commit -m "Describe your change"
git push origin my-feature
```

Then open a pull request on GitHub. Please don't include API keys or `.env.local` files in your commits.

## License

Released under the [MIT License](LICENSE). You are free to use, copy, modify and distribute this code, as long as you keep the copyright notice.
