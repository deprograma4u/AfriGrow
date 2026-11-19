import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './ThemeProvider';
import { useTranslation } from '@/hooks/useTranslation';
import TextWithPlay from './TextWithPlay';

interface InfoCardProps {
  title: string;
  emoji: string;
  imageUrl: string;
  onPress: () => void;
  description?: string;
  gradient?: [string, string];
}

export default function InfoCard({
  title,
  emoji,
  imageUrl,
  onPress,
  description,
  gradient,
}: InfoCardProps) {
  const {t} = useTranslation();
  const themeColors = useTheme()
  const defaultGradient: [string, string] = [themeColors.primary, themeColors.secondary];
  
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: themeColors.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={ imageUrl }
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={gradient || defaultGradient}
        style={styles.gradient}
      >
        
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>{emoji}</Text>
          {/* <Text style={styles.title}>{t(title, "")}</Text> */}
          <TextWithPlay 
            text={t(title, "crops")}
            textColor={themeColors.text}
            textStyle={styles.title}
            btnColor={themeColors.text}
            toBackend={true}
            
          />
        </View>

        {description && (
          <TextWithPlay 
            text={description}
            textColor={themeColors.text}
            textStyle={styles.description}
            btnColor={themeColors.text}
            // btnSize={12}
            toBackend={true}
            
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    flex: 1,
    color: 'rgba(255,255,255,0.9)',
  },
});