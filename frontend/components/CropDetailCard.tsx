import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Heart } from 'lucide-react-native';
import { Crop } from '@/mocks/crops';
import { useAppStore } from '@/store/app-store';
import { useTheme } from './ThemeProvider';
import { useTranslation } from '@/hooks/useTranslation';

interface CropDetailCardProps {
  crop: Crop;
}

export default function CropDetailCard({ crop }: CropDetailCardProps) {
    const { language, t } = useTranslation();
  const theme = useTheme()
  const { favoriteCrops, toggleFavoriteCrop } = useAppStore();
  const isFavorite = favoriteCrops.includes(crop.id);

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Image
        source={crop.imageUrl }
        style={styles.image}
        contentFit="cover"
        transition={300}
      />

      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>{crop.emoji}</Text>
          <Text style={[styles.title, { color: theme.text }]}>{crop.name[language]}</Text>
        </View>

        <TouchableOpacity
          onPress={() => toggleFavoriteCrop(crop.id)}
          style={styles.favoriteButton}
        >
          <Heart
            size={24}
            color={isFavorite ? theme.error : theme.iconLight}
            fill={isFavorite ? theme.error : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoEmoji}>🌱</Text>
          <Text style={[styles.infoLabel, { color: theme.textLight }]}>Season</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>{crop.season[language]}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoEmoji}>💧</Text>
          <Text style={[styles.infoLabel, {color: theme.textLight}]}>Water</Text>
          <View style={styles.needsContainer}>
            {['low', 'medium', 'high'].map((level) => (
              <View
                key={level}
                style={[
                  styles.needDot,
                  {
                    backgroundColor:
                      level === crop.waterNeeds.en
                        ? theme.weatherBlue
                        : level === 'low' && crop.waterNeeds.en === 'medium'
                        ? theme.weatherBlue
                        : level === 'low' && crop.waterNeeds.en === 'high'
                        ? theme.weatherBlue
                        : level === 'medium' && crop.waterNeeds.en === 'high'
                        ? theme.weatherBlue
                        : theme.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoEmoji}>☀️</Text>
          <Text style={[styles.infoLabel, {color: theme.textLight}]}>Sun</Text>
          <View style={styles.needsContainer}>
            {['low', 'medium', 'high'].map((level) => (
              <View
                key={level}
                style={[
                  styles.needDot,
                  {
                    backgroundColor:
                      level === crop.sunNeeds.en
                        ? theme.accent
                        : level === 'low' && crop.sunNeeds.en === 'medium'
                        ? theme.accent
                        : level === 'low' && crop.sunNeeds.en === 'high'
                        ? theme.accent
                        : level === 'medium' && crop.sunNeeds.en === 'high'
                        ? theme.accent
                        : theme.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoEmoji}>📅</Text>
          <Text style={[styles.infoLabel, {color: theme.textLight}]}>Growth</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>{crop.growthTime} days</Text>
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={[styles.tipsTitle, { color: theme.text }]}>Growing Tips:</Text>
        {crop.tips[language].map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Text style={[styles.tipBullet, { color: theme.success }]}>•</Text>
            <Text style={[styles.tipText, { color: theme.text }]}>{tip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    height: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    // borderBottomColor: theme.border,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: theme.text,
  },
  favoriteButton: {
    padding: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    // borderBottomColor: theme.border,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    // color: theme.textLight,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    // color: theme.text,
  },
  needsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  needDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tipsContainer: {
    padding: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: theme.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    marginRight: 8,
    // color: theme.primary,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    // color: theme.text,
  },
});