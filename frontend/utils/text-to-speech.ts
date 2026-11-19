import * as Speech from 'expo-speech';

interface TTSOptions {
    text: string;
    language?: string;
    voice?: string;
    rate?: number;
    volume?: number;
    pitch?: number;
}

class TextToSpeechService {
    private isSpeacking = false;
    private currentUtterance: any = null

    async speak(options: TTSOptions):Promise<void> {
        if (this.isSpeacking) {
            await this.stop();
        }

        this.isSpeacking = true;
        
        const { text, language, voice, rate = 1, volume = 1, pitch = 1 } = options;

        await Speech.speak(text, {
            language,
            voice,
            rate,
            volume,
            pitch,
        });

        const duration = Math.min(text.length * 100, 5000);

        return new Promise((reslove)=>{
            this.currentUtterance = setTimeout(()=>{
                this.isSpeacking = false;

                reslove()
                // return 
            }, duration)
        })

    }

    async stop(): Promise<void> {
        Speech.stop();
        this.isSpeacking = false;
        return Promise.resolve();
    }

    async pause(): Promise<void> {
        Speech.pause();
        this.isSpeacking = false;
        return Promise.resolve();
    }

    async resume(): Promise<void> {
        Speech.resume();
        this.isSpeacking = true;
        return Promise.resolve();
    }
}

export const TTS = new TextToSpeechService();
