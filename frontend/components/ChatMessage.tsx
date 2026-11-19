import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./ThemeProvider";
import TextWithPlay from "./TextWithPlay";
import { Pause, Play } from "lucide-react-native";
import { 
  useAudioRecorder, 
  useAudioRecorderState,
  useAudioPlayerStatus,
  AudioPlayer,
  AudioRecorder,
  RecordingPresets
} from 'expo-audio';
import { PermissionsAndroid } from 'react-native';
import { useAudioPlayer} from 'expo-audio';

export interface Recording {
  id: string;
  uri: string;
  name: string;
  size: number;
  date: string;
}

interface ChatMessageProps {
  id: string;
  message?: string;
  isUser?: boolean;
  emoji?: string;
  isAudio?: boolean;
  uri?: string | null;
}

export default function ChatMessage({
  message,
  isUser,
  emoji,
  isAudio,
  uri,
  id,
}: ChatMessageProps) {
  const Colors = useTheme();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<AudioPlayer | null>(null);
  const [playingIndex, setPlayingIndex] = useState<string | null>(null);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const recorder: AudioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderStatus = useAudioRecorderState(recorder);
  const playerStatus = currentPlayer ? useAudioPlayerStatus(currentPlayer) : null;
  
  // Initialize audio player at component level (hooks must be at top level)
  const player = useAudioPlayer(audioUrl ?? undefined, 500);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    // requestPermissions();
    return () => {
      if (currentPlayer) {
        currentPlayer.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (playerStatus && !playerStatus?.playing && playingIndex !== null) {
      if (playerStatus.currentTime >= playerStatus.duration && playerStatus.duration > 0) {
        setPlayingIndex(null);
        if (currentPlayer) {
          currentPlayer.remove();
          setCurrentPlayer(null);
        }
      }
    }
  }, [playerStatus]);

  // When a new audio URL is set, attempt playback
  useEffect(() => {
    const play = async () => {
      if (status.isLoaded && typeof status.duration === 'number' && status.duration > 0) {
        setIsPlaying(true);
        const duration = status?.duration; // in seconds
        const position = status?.currentTime; // in seconds
        await player.play();

        const remaining = (duration - (position ?? 0)) * 1000;
        console.log('Duration (s):', duration);
        setTimeout(()=> {
          // setIsPlaying(false)
          stopAudio()

        }, remaining)
      }
    }

    play()
  }, [status.isLoaded, status.duration]);

  // Detect finished playback (expo-audio doesn't auto-reset position)
  useEffect(() => {
    if (!status.isLoaded) return;

    // If player is paused and position is very close to duration -> playback finished
    const dur = typeof status.duration === 'number' ? status.duration : 0;
    const pos = typeof status.currentTime === 'number' ? status.currentTime : 0;

    if (!status.playing && dur > 0 && Math.abs(dur - pos) < 0.5) {
      // finished
      setIsPlaying(false);
      // Optionally reset for replay:
      player.seekTo(0);
    }
  }, [status.playing, status.currentTime, status.duration, status.isLoaded]);

  const onPlayPause = () => {
    try {
      if (isPlaying) {
        player.pause();
        setIsPlaying(false);
      } else {
        // NOTE: player.play() is the correct expo-audio call (not playAsync)
        player.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Playback error', err);
    }
  };

  useEffect(() => {

    // const play = async () => {
    //     if (!audioUrl) return;
    //     try {
    //         setIsPlaying(true);
    //         const duration = player?.duration; // in seconds
    //         const position = player?.currentTime; // in seconds
    //         await player.play();

    //         const remaining = (duration - (position ?? 0)) * 1000;
    //         console.log("Remaining: ", remaining)
    //         setTimeout(()=> {
    //           // setIsPlaying(false)
    //           stopAudio()

    //         }, remaining)

    //       } catch (e) {
    //         console.log('Play error', e);
    //     } 
    //     // finally {
    //     //   setIsPlaying(false);
    //     //   setAudioUrl(null)
    //     // }
    // };

    // play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  const playRecording = async (recordingItem: Recording): Promise<void> => {
    try {
      if (isPlaying) {
        console.log("Already playing...")
        // currentPlayer.remove();
        // setCurrentPlayer(null);
        setPlayingIndex(null);
        setIsPlaying(false)
        setAudioUrl(null)
      }

      console.log("playing...: ", recordingItem.uri)
      setIsPlaying(true);
      setAudioUrl(recordingItem.uri)
    } catch (error) {
      Alert.alert('Error', 'Failed to play recording');
      console.error('Error playing recording:', error);
    }
  };

  const stopAudio = async (): Promise<void> => {
    console.log("He")
    if (isPlaying) {
      // await currentPlayer.pause();
      await player.pause()
      setAudioUrl(null)
      setIsPlaying(false);
      setPlayingIndex(null)
    }
  };

  return (
    <>
      <View
        style={[
          styles.container,
          isUser ? styles.userContainer : styles.botContainer,
        ]}
      >
        {!isUser && emoji && <Text style={styles.emoji}>{emoji}</Text>}
        <View
          style={[
            styles.bubble,
            isUser
              ? [styles.userBubble, { backgroundColor: Colors.primary }]
              : [styles.botBubble, { backgroundColor: Colors.cardBackground }],
          ]}
        >
          {!isAudio ? (
            <TextWithPlay
              text={message || ""}
              textColor={isUser ? "white" : Colors.text}
              textStyle={styles.text}
              disableBtn={isUser}
              btnColor={Colors.primary}
              btnStyle={{ marginTop: 10 }}
            />
          ) : (
            <View>
              <TouchableOpacity
                onPress={isPlaying ? stopAudio : () => uri && playRecording({ id, uri, name: 'Audio', size: 0, date: '' })}
              >
                {isPlaying ? (
                  <Pause size={24} color={"white"} />
                ) : (
                  <Play size={24} color={"white"} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
        {isUser && emoji && <Text style={styles.emoji}>{emoji}</Text>}
      </View>
          
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 8,
    maxWidth: "80%",
    alignItems: "center",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  botContainer: {
    alignSelf: "flex-start",
  },
  bubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "white",
  },
  emoji: {
    fontSize: 24,
    marginHorizontal: 8,
  },
});
