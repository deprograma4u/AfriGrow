import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send, Trash2Icon, Volume2 } from "lucide-react-native";
import { useTheme } from "@/components/ThemeProvider";
import Emojis from "@/constants/emojis";
import { useAppStore } from "@/store/app-store";
import { chatbotResponses } from "@/mocks/chatbot-responses";
import ChatMessage, { Recording } from "@/components/ChatMessage";
import RecordButton from "@/components/RecordButton";
import TopNav from "@/components/TopNav";
import { useTranslation } from "@/hooks/useTranslation";
import { BotFaqs } from "@/mocks/bot-faq";
import TextWithPlay from "@/components/TextWithPlay";
import { AudioPlayer, AudioRecorder, RecordingPresets, useAudioPlayerStatus, useAudioRecorder, useAudioRecorderState } from "expo-audio";
import * as FileSystem from 'expo-file-system';
import CustomText from "@/components/CustomText";


export default function ChatbotScreen() {
  const { t, language } = useTranslation();
  const theme = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const [audioUri, setAudioUri] = useState<string | undefined | null>('');

  const [currentPlayer, setCurrentPlayer] = useState<AudioPlayer | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [generating, setGenerating] = useState(false)
  
  const recorder: AudioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderStatus = useAudioRecorderState(recorder);
  const playerStatus = currentPlayer ? useAudioPlayerStatus(currentPlayer) : null;
  const [localIp, setLocalIp] = useState<String | null>("192.168.0.159:8002");
    
  // #################################################
  const {
    chatHistory,
    addChatMessage,
    clearChatHistory,
    isRecording,
    setIsRecording,
  } = useAppStore();
  const [showKeyboard, setShowKeyboard] = useState(false);

  
  useEffect(() => {
    // console.log(PermissionsAndroid.RESULTS)
    requestPermissions();
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

  const requestPermissions = async (): Promise<void> => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Audio Recording Permission',
            message: 'This app needs access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Required',
            'Audio recording permission is required to use this feature.'
          );
        }
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowKeyboard(true);
        scrollToBottom();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setShowKeyboard(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    addChatMessage(message, true, Emojis.farmer);

    // Simulate bot response
    setTimeout(() => {
      // Find a matching response or use a default one
      const lowerMessage = message.toLowerCase();
      const matchingResponse = chatbotResponses.find((response) =>
        lowerMessage.includes(response.query[language])
      );

      if (matchingResponse) {
        addChatMessage(
          matchingResponse.response[language],
          false,
          matchingResponse.emoji
        );
      } else {
        addChatMessage(t("notSure", "chatbot"), false, Emojis.question);
      }
    }, 1000);

    setMessage("");
  };

  const startRecording = async (): Promise<void> => {
    try {
      await recorder.prepareToRecordAsync();
      recorder.record()
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
      console.error('Error starting recording:', error);
      setIsRecording(false)
      requestPermissions()
    }
  };

  const processStream = useCallback(async (uri: any) => {
    try {
      console.log("streaming: ", uri)

      const formData = new FormData();
      formData.append("audio_file", {
        uri: uri, 
        type: "audio/mpeg",
        name: "recording.m4a",
      } as any);
      formData.append("query_text", "");
      formData.append("preferred_language", "tw");
      formData.append("query_formart", "audio");
      
      const response = await fetch(`http://${localIp}/process`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      
      if (!response.ok) {
        console.log("Error: ", response.body)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      while (true){
        const text = await response.text();
        console.log("Response Text: ", text)

        const lines = text.split('\n').filter(l => l.trim());

        for (const line of lines) {
          if (line.trim()) {
            console.log("looping...")
            try {
              const data = JSON.parse(line);
  
              // Check if this is the final result
              if(data.event === "error" ){
                addChatMessage("⚠️ Error", false, "🤖", false, "")
                ToastAndroid.showWithGravity(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
                setGenerating(false)
                return
              }
              if (data.status === 'done') {
                const audio_url = data.audio_url
                  
                addChatMessage('', false, "🤖", true, audio_url)
                
                setGenerating(false)

                return
              }
              // console.log("Received chunk:", data);
              
              // addChatMessage(data.event, false, "🤖", false, "")
              
            } catch (parseError) {
              console.warn('Failed to parse JSON:', line, parseError);
              setGenerating(false)
            }
          }
        }

      }
    } catch (error) {
      console.log("Error Streaming: ", error)
      setGenerating(false)

    }
  }, []);

  const stopRecording = async (): Promise<void> => {
    try {
      await recorder.stop();
      setIsRecording(false)
      console.log(recorder.uri)
      if (recorder.uri) {
        const fileInfo = await FileSystem.getInfoAsync(recorder.uri);
        
        const newRecording: Recording = {
          id: Date.now().toString(),
          uri: recorder.uri,
          name: `Recording ${recordings.length + 1}`,
          size: fileInfo.exists && 'size' in fileInfo ? fileInfo.size : 0,
          date: new Date().toLocaleDateString(),
        };

        setRecordings(prev => [...prev, newRecording]);
        addChatMessage('', true, '🧑‍🌾', true, recorder.uri);

        setGenerating(true)
        console.log("sending to backend")
        await processStream(recorder.uri)

      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      ToastAndroid.showWithGravity("Failed to stop recording", ToastAndroid.LONG, ToastAndroid.BOTTOM)
    }
  };

  
  const deleteRecording = async (index: number): Promise<void> => {
    try {
      const recordingToDelete = recordings[index];
      
      if (playingIndex === index && currentPlayer) {
        await stopAudio();
      }

      await FileSystem.deleteAsync(recordingToDelete.uri);
      
      setRecordings(prev => prev.filter((_, i) => i !== index));
      
      if (playingIndex !== null && playingIndex > index) {
        setPlayingIndex(playingIndex - 1);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete recording');
      console.error('Error deleting recording:', error);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stopAudio = async (): Promise<void> => {
    if (currentPlayer) {
      await currentPlayer.pause();
      setIsPlaying(false);
      setPlayingIndex(null);
      currentPlayer.remove();
      setCurrentPlayer(null);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["bottom"]}
    >
      <TopNav
        color={theme.text}
        bgColor={theme.cardBackground}
        title="Farmer Assistant"
        langIcon={true}
        headerRight={(<TouchableOpacity onPress={()=> clearChatHistory()}>
          <Trash2Icon size={18} color={theme.text} />
        </TouchableOpacity>)}
      />

      {chatHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emoji}>{Emojis.farmer}</Text>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            Farm Assistant
          </Text>

          <TextWithPlay
            text={t("askMe", "chatbot")}
            textColor={theme.textLight}
            textStyle={styles.emptyText}
            btnColor={theme.primary}
          />
          
          {
            language == "en" && <>
              <View style={styles.examplesContainer}>
                <TextWithPlay 
                  text={t("tryAsking", "chatbot")}
                  textColor={theme.text}
                  textStyle={styles.emptyTitle}
                  btnColor={theme.primary}
                />
                {BotFaqs.map((faq, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.examplesButton,
                      {
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.border,
                      },
                    ]}
                    onPress={() => {
                      setMessage(faq.query[language]);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    <TextWithPlay
                      text={faq.query[language]}
                      textColor={theme.text}
                      textStyle={styles.examplesText}
                      btnColor={theme.primary}
                      toBackend={true}
                      children={(
                        <Text>{faq.emoji}</Text>
                      )}
                      
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          }
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {chatHistory.map((chat, ind) => (
            <ChatMessage
              id={chat.id}
              key={ind}
              message={chat.message}
              isUser={chat.isUser}
              isAudio={chat.isAudio}
              uri={chat.uri}
              emoji={chat.emoji}
            />
          ))}
          {
            generating && <View style={{alignSelf: "flex-start", marginTop: 10, flexDirection: "row", alignItems: "center"}}>
              <ActivityIndicator  size={"small"} color={'#cccc'}  />
              <CustomText size={12} color={theme.text} text=" loading..." />
            </View>
          }
        </ScrollView>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.border,
          },
        ]}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: language === "en" ? theme.background : theme.border,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            // aria-disabled={true}
            placeholder={t("typeQuestion", "chatbot")}
            placeholderTextColor={theme.textLight}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSendMessage}
            returnKeyType="send"
            editable={language === "en"}

          />
          {message.trim() !== "" ? (
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: theme.primary }]}
              onPress={handleSendMessage}
            >
              <Send size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <RecordButton
              isRecording={isRecording}
              generating={generating}
              onPress={isRecording ? stopRecording : startRecording}
            />
          )}
        </View>
      </KeyboardAvoidingView>

      {isRecording && (
        <View
          style={[
            styles.recordingContainer,
            { backgroundColor: theme.error + "20"},
          ]}
        >
          <Text style={[styles.recordingText, { color: theme.error }]}>
            {t("listening", "chatbot")} {Emojis.listen}
          </Text>
          <TouchableOpacity disabled={generating} style={styles.playButton}>
            <Volume2 size={16} color={theme.primary} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    flex: 1
  },
  examplesContainer: {
    width: "100%",
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  examplesButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  examplesText: {
    fontSize: 14,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 16,
  },
  inputContainer: {
    borderTopWidth: 1,
    padding: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    fontSize: 16,
    borderWidth: 1,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  recordingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    padding: 8,
    borderRadius: 16,
  },
  recordingText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  playButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
