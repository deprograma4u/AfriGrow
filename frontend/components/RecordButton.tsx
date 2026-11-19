import React from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { Mic } from 'lucide-react-native';
import { useTheme } from './ThemeProvider';

interface RecordButtonProps {
  isRecording: boolean;
  generating?: boolean;
  onPress: () => void;
}

export default function RecordButton({ isRecording, onPress, generating=false }: RecordButtonProps) {
  const Colors = useTheme();
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isRecording, pulseAnim]);

  return (
    <View style={styles.container}>
      {isRecording && (
        <Animated.View
          style={[
            styles.pulse,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.2],
                outputRange: [0.7, 0],
              }),
              backgroundColor: Colors.error,
            },
          ]}
        />
      )}
      <TouchableOpacity
        style={[
          styles.button,
          isRecording
            ? [styles.recording, { backgroundColor: Colors.error, borderColor: Colors.error }]
            : { borderColor: Colors.primary },
          {opacity: generating ? .4 : 1 }
        ]}
        disabled={generating}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Mic
          size={28}
          color={isRecording ? 'white' : Colors.primary}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  pulse: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
  },
  recording: {
    borderColor: 'transparent',
  },
});