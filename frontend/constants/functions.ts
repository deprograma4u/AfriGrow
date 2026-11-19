

import * as Speech from 'expo-speech';
import { Alert, Linking, Platform } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';


export const checkVoices = async () => {
    
    const openTTSSettings = () => {
        if (Platform.OS === 'android') {
        // TypeScript fix: cast the string manually
        IntentLauncher.startActivityAsync(
            'android.settings.TTS_SETTINGS' as any
        );
        } else {
        Alert.alert(
            'iOS Not Supported',
            'Please go to Settings > Accessibility > Spoken Content > Voices to install more voices.'
        );
        }
    };

    try{
        const voices = await Speech.getAvailableVoicesAsync();

        // checking for english
        const hasEnglish = voices.some(voice => voice.language.startsWith('en-'));

        // cheching for Twi
        const hasTwi = voices.some(voice => voice.language.startsWith('ak-') || voice.language.startsWith('tw') || voice.language.startsWith('twi') || voice.language.startsWith('akan'))

        return {
            status: 200,
            englishAvailable: hasEnglish,
            twiAvailable: hasTwi
        }
    } catch(error){
        return {
            status: 400
        }
    }
} 

export const openVoiceInstall = () => {
    if (Platform.OS === 'android') {
      // Try Google TTS first, then fallback to device settings
      console.log("Opening")
      Linking.openURL('com.google.android.tts://manage-voices').catch(() => {
        Linking.openURL('settings:accessibility/tts_settings');
      });
    } else {
      // iOS
      Linking.openURL('App-Prefs:root=General&path=ACCESSIBILITY/VOICEOVER/TTS');
    }
  };
