import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherInfo } from '@/mocks/weather';
import { useTheme } from './ThemeProvider';
import TextWithPlay from './TextWithPlay';

interface WeatherCardProps {
  weather: WeatherInfo;
  language: 'en' | 'tw';
}

export default function WeatherCard({ weather, language }: WeatherCardProps) {
  const theme = useTheme();
  const getGradientColors = () => {
    switch (weather.condition[language]) {
      case 'Sunny':
        return ['#FFB308', '#FFB808'] as const;
      case 'Rainy':
        return ['#4A2AF5', '#1976D2'] as const;
      case 'Cloudy':
        return ['#7899BC', '#546E7A'] as const;
      case 'Stormy':
        return ['#5C8BC8', '#3949AB'] as const;
      default:
        return ['#98CAF9', '#648EF6'] as const;
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>{weather.emoji}</Text>
        {/* <Text style={styles.condition}>{weather.condition[language]}</Text> */}
        <TextWithPlay 
          text={weather.condition[language]}
          textColor={theme.text}
          textStyle={styles.condition}
          btnColor={theme.primary}
          // btnSize={12}
          
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailEmoji}>🌡️</Text>
          <Text style={styles.detailValue}>{weather.temperature}°C</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailEmoji}>🌧️</Text>
          <Text style={styles.detailValue}>{weather.humidity} mm</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailEmoji}>💧</Text>
          <Text style={styles.detailValue}>{weather.rainfall}%</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailEmoji}>🌬️</Text>
          <Text style={styles.detailValue}>{weather.wind} km/h</Text>
        </View>
      </View>

      <View style={styles.adviceContainer}>
        <Text style={styles.adviceEmoji}>💡</Text>
        {/* <Text style={styles.advice}>{weather.advice[language]}</Text> */}
        <TextWithPlay 
          text={weather.advice[language]}
          textColor={theme.text}
          textStyle={styles.advice}
          btnColor={theme.primary}
          // btnSize={12}
          
        />
      </View>
      <View>
        <Text style={{color: "white", paddingVertical: 10}} >Forecast for weather in 3 days Time: {weather.date}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  condition: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detail: {
    alignItems: 'center',
  },
  detailEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  adviceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
  },
  adviceEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  advice: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
  },
});