import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { ArrowRight } from 'lucide-react-native';
import { CropAnalysis } from '@/mocks/crop-analysis';
import { useTheme } from './ThemeProvider';
import { useTranslation } from '@/hooks/useTranslation';

interface AnalysisResultProps {
  analysis: CropAnalysis;
  onViewDetails?: () => void;
}

export default function AnalysisResult({ analysis, onViewDetails }: AnalysisResultProps) {
  const Colors = useTheme();
  const {t, language} = useTranslation()

  const getStatusColor = () => {
    switch (analysis.condition["en"]) {
      case 'healthy':
        return Colors.success;
      case 'pest':
      case 'disease':
        return Colors.error;
      case 'nutrient':
        return Colors.warning;
      case 'water':
        return Colors.info;
      default:
        return Colors.primary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.cardBackground }]}>
      <View style={[styles.header, { borderBottomColor: Colors.border }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>{analysis.emoji}</Text>
        </View>
        <Text style={[styles.title, { color: Colors.text }]}>{analysis.cropName[language]}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{analysis.condition[language]}</Text>
        </View>
      </View>

      <Image
        source={analysis.imageUrl }
        style={styles.image}
        contentFit="cover"
        transition={300}
      />

      <View style={[styles.descriptionContainer, { borderBottomColor: Colors.border }]}>
        <Text style={[styles.description, { color: Colors.text }]}>{analysis.description[language]}</Text>
      </View>

      <View style={styles.recommendationsContainer}>
        <Text style={[styles.recommendationsTitle, { color: Colors.text }]}>Recommendations:</Text>
        {analysis.recommendations[language].map((recommendation, index) => (
          <View key={index} style={styles.recommendationItem}>
            <Text style={[styles.recommendationBullet, { color: Colors.primary }]}>•</Text>
            <Text style={[styles.recommendationText, { color: Colors.text }]}>{recommendation}</Text>
          </View>
        ))}
      </View>

      {onViewDetails && (
        <TouchableOpacity
          style={[styles.detailsButton, { borderTopColor: Colors.border }]}
          onPress={onViewDetails}
        >
          <Text style={[styles.detailsButtonText, { color: Colors.primary }]}>View Detailed Guide</Text>
          <ArrowRight size={16} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  titleContainer: {
    marginRight: 8,
  },
  emoji: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 200,
  },
  descriptionContainer: {
    padding: 16,
    borderBottomWidth: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  recommendationsContainer: {
    padding: 16,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recommendationBullet: {
    marginRight: 8,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderTopWidth: 1,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
});