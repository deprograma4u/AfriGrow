import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewStyle, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation';
import { TTS } from '@/utils/text-to-speech';
import { Square, Volume2 } from 'lucide-react-native';
import axios from 'axios';
import { useAudioPlayer } from 'expo-audio';


interface PlayButtonProps {
    text: string;
    size?: number;
    color?: string;
    style?: ViewStyle;
    toBackend?: boolean;
}

const PlayButton = ({text, size = 16, color, style, toBackend = false}: PlayButtonProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {language} = useTranslation();
    const [localIp, setLocalIp] = useState<String | null>("192.168.0.159:8002");
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    // Initialize audio player at component level (hooks must be at top level)
    const player = useAudioPlayer(audioUrl ?? undefined);

    // When a new audio URL is set, attempt playback
    useEffect(() => {
        const play = async () => {
            if (!audioUrl) return;
            try {
                setIsPlaying(true);
                await player.play();
            } catch (e) {
                console.log('Play error', e);
            } finally {
                setIsPlaying(false);
            }
        };
        play();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioUrl]);
  
    const handlePress = async () => {
        if(isPlaying) {
            try { await TTS.stop(); } catch {}
            try { (player as any)?.stop?.(); } catch {}
            setIsPlaying(false);
            return
        }

        setIsLoading(true);
        try{
            if(!toBackend){
                setIsPlaying(true);
                await TTS.speak({text: text, language: language}).then(res=>{
                    console.log(res)
                    setIsPlaying(false)
                });
                
            } else{
                const transc = await axios.post(`http://${localIp}/convertTextToAudio`, {
                    prefered_language: "tw",
                    query_text: text
                })
                if(!transc) {
                    return
                } else{
                    console.log("TRans Res: ", transc.data)
                    const url = transc.data?.audio_url || transc.data?.audio;
                    if (!url) throw new Error('No audio URL returned from backend');
                    setAudioUrl(url);

                }
            }
            
            
        } catch (error) {
            ToastAndroid.showWithGravity("An Error Orcured, check your internet Connection!!", ToastAndroid.LONG, ToastAndroid.BOTTOM)
            console.log("Plaing Eror", error);
            setIsPlaying(false);
        } finally{
            setIsLoading(false)
            // isPlaying is managed around actual play actions
        }

        // setIsPlaying(false);
    }
  return (
    <TouchableOpacity style={[styles.button, {width: size, height: size}, style]} onPress={handlePress}>
        {
            isLoading ? <>
                <ActivityIndicator size={"small"} color={color || '#fff'} />
            </> : <>
                {
                    isPlaying ? (
                        isPlaying === true ? (
                            <Square size={size} color={color || '#fff'} />
                        ) : (
                            <ActivityIndicator size={"small"} color={color || '#fff'} />
                        )
                    ) : (
                        <Volume2 size={size} color={color || '#fff'} />
                    )
                }
            </>
        }
    </TouchableOpacity>
  )
}

export default PlayButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    }
})