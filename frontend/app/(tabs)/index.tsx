import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/components/ThemeProvider";
import { crops } from "@/mocks/crops";
import { farmingTips } from "@/mocks/farming-tips";
import { WeatherInfo, weatherInfo } from "@/mocks/weather";
import { useAppStore } from "@/store/app-store";
import InfoCard from "@/components/InfoCard";
import WeatherCard from "@/components/WeatherCard";
import TopNav from "@/components/TopNav";
import { styles } from "@/constants/styles";
import { useTranslation } from "@/hooks/useTranslation";
import TextWithPlay from "@/components/TextWithPlay";
import { PUBLIC_WEATHER_API_KEY, WEATHER_API_BASE_URL } from "@/constants/vairables";
import * as Speech from 'expo-speech';
import { checkVoices, openVoiceInstall } from "@/constants/functions";
import * as IntentLauncher from 'expo-intent-launcher';

export default function AgricultureInfoScreen() {
  const theme = useTheme();
  const router = useRouter();
  const {t, language} = useTranslation();
  const { addRecentlyViewedCrop, userProfile } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherInfo>({
    id: '1',
    emoji: '',
    humidity: 0,
    temperature: 0,
    rainfall: 0,
    wind: 0,
    condition: {
      en: '',
      tw: ''
    },
    advice: {
      en: '',
      tw: ''
    },
    date: ''
  });

  const location = userProfile.location.split(",")
  const getWeather = async () => {
    try{
      const days = 3;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${PUBLIC_WEATHER_API_KEY}&q=${location[2]}&days=${days}`;
      // const response = await axios.post(`${WEATHER_API_BASE_URL}`, {params: {key: PUBLIC_WEATHER_API_KEY, q: location[2]}})
      const response = await axios.get(url)
      // console.log("Weather Response: ", response.data)

      if(response.data){
        const forecastDays = response.data.forecast.forecastday;

        const thirdDay = forecastDays[2]
        const bestChance = thirdDay.hour.reduce((max: any, current: any)=> {
          return current.chance_of_rain > max.chance_of_rain ? current : max;
        })

        const dateForcasted = thirdDay.date;
        const time = bestChance.time;
        const condition = bestChance.condition.text;
        const temp = bestChance.temp_c;
        const wind = bestChance.wind_kph;
        const humidity = bestChance.humidity;
        const chanceOfRain = bestChance.chance_of_rain;

        // thirdDay.hour.forEach((hour: any) => {
        //   const time = hour.time;
        //   const condition = hour.condition.text;
        //   const temp = hour.temp_c;
        //   const chanceOfRain = hour.chance_of_rain;

        //   // Filter common conditions
        //   if (
        //     condition.includes('rain') || condition.includes('sun') ||
        //     condition.includes('cloud') ||
        //     condition.includes('thunder')
        //   ) {
        //   }
        // });
        // console.log(`\n📅 Date: ${dateForcasted}`);
        // console.log(`🕒 ${time} → ${condition}, 🌡️ ${temp}°C, ☔ Rain chance: ${chanceOfRain}%`);

        // forecastDays.forEach((day: any) => {
        //   console.log(`\n📅 Date: ${day.date}`);

        //   day.
        // });
        setCurrentWeather( {
          id: '1',
          emoji: condition.includes('rain') ? '☔' : condition.includes('sun') ? '☀️' : condition.includes('cloud') ? '☁️' : condition.includes('thunder') && '⛈️' ,
          humidity: humidity,
          temperature: temp,
          wind: wind,
          rainfall: chanceOfRain,
          advice: {
            en: '',
            tw: ''
          },
          condition: {
            en: condition,
            tw: ''
          },
          date: dateForcasted
        })
      }

    } catch(error){
      console.log("Error: ", error)
    }
  }
  
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

  useEffect(()=> {
    const getVoices = async () => {
      try{
        const response = await checkVoices();
        if(response.status == 200){
          const missing = []
          if(!response.englishAvailable) missing.push('English');
          if(!response.twiAvailable) missing.push('Twi');
          Alert.alert(
            'Download Language(s)', 
            `Your device is missing ${missing.join(' and ')} voice capabilities. Would you like to install them?`,
            [
              { text: 'Install Voices', onPress: () => openTTSSettings() },
              { text: 'Not Now', style: 'cancel' }
            ]
          )
        } else{
          Alert.prompt('Error', "Something went wrong!!")
        }
        // console.log(voices.lan);

      } catch(error){
        console.error("Speech Error: ", error)
      }
    }


    getWeather()
    // getVoices()
    // setTimeout(()=> {
    // }, 60000)
  }, [])

  // Simulate weather changes
  useEffect(() => {
    // const updateWeather = () => {
    //   const weatherIndex = Math.floor(Math.random() * weatherInfo.length);
    //   setCurrentWeather(weatherInfo[weatherIndex]);
    // };

    // // Initial weather update
    // updateWeather();

    // Set up interval for periodic updates if needed
    const intervalId = setInterval(getWeather, 300000); // Update every 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // Simulate a refresh
    setTimeout(() => {
      // const weatherIndex = Math.floor(Math.random() * weatherInfo.length);
      // setCurrentWeather(weatherInfo[weatherIndex]);
      getWeather();
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleCropPress = (cropId: string) => {
    addRecentlyViewedCrop(cropId);
    router.push(`/crop-details/${cropId}`);
  };

  const handleTipPress = (tipId: string) => {
    router.push(`/farming-tip/${tipId}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["bottom"]}
    >
      <TopNav
        color={theme.text}
        bgColor={theme.cardBackground}
        title="Afri Grow"
        langIcon
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Weather Display */}
        <View style={styles.section}>
          <TextWithPlay 
            text={t("today", "home")}
            textColor={theme.text}
            textStyle={styles.sectionTitle}
            btnColor={theme.primary}
            // btnSize={12}
            children={(
              <Text style={styles.emoji}>{currentWeather.emoji}</Text>
            )}
            toBackend={true}
          />
          <WeatherCard language={language} weather={currentWeather} />
        </View>

        {/* Seasonal Crops */}
        <View style={styles.section}>
          <TextWithPlay
            text={t("seasonalCrops", "home")}
            textColor={theme.text}
            textStyle={styles.sectionTitle}
            btnColor={theme.primary}
            // btnSize={12}
            children={(
              <Text style={styles.emoji}>🌾</Text>
            )}
            toBackend={true}
          />
          
          <View style={styles.cropGrid}>
            {crops.slice(0, 4).map((crop) => (
              <View key={crop.id} style={styles.cropGridItem}>
                <InfoCard
                  title={language == "en" ? crop.name.en : crop.name.tw}
                  emoji={crop.emoji}
                  imageUrl={crop.imageUrl}
                  onPress={() => handleCropPress(crop.id)}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.viewAllButton,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              },
            ]}
            onPress={()=> router.push("/view-crops")}
          >
            <TextWithPlay 
              text={t("viewAllCrops", "common")}
              textColor={theme.text}
              textStyle={styles.viewAllText}
              btnColor={theme.primary}
              // btnSize={12}
              toBackend={true}
              
            />
            
          </TouchableOpacity>
        </View>
        
        {/* Farming Tips */}
        <View style={styles.section}>
          <TextWithPlay 
            text={t("farmingTips", "home")}
            textColor={theme.text}
            textStyle={styles.sectionTitle}
            btnColor={theme.primary}
            // btnSize={12}
            children={(
              <Text style={styles.emoji}>🌱</Text>
            )}
            toBackend={true}
          />
          {farmingTips.slice(0, 3).map((tip) => (
            <InfoCard
              key={tip.id}
              title={tip.title[language]}
              emoji={tip.emoji}
              imageUrl={tip.imageUrl}
              description={tip.description[language]}
              onPress={() => handleTipPress(tip.id)}
            />
          ))}
          <TouchableOpacity
            style={[
              styles.viewAllButton,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              },
            ]}
            onPress={()=> router.push("/farming-tips")}
          >
            <TextWithPlay 
              text={t("viewAllTips", "common")}
              textColor={theme.text}
              textStyle={styles.viewAllText}
              btnColor={theme.primary}
              // btnSize={12}
              toBackend={true}
              
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
