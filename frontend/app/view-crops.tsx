import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { crops } from "@/mocks/crops";
import { styles } from "@/constants/styles";
import InfoCard from "@/components/InfoCard";
import { useAppStore } from "@/store/app-store";
import { useRouter } from "expo-router";
import TopNav from "@/components/TopNav";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "@/hooks/useTranslation";

const viewCrops = () => {
  const router = useRouter();
  const { language } = useTranslation();
  const { addRecentlyViewedCrop } = useAppStore();
  const theme = useTheme();

  const handleCropPress = (cropId: string) => {
    addRecentlyViewedCrop(cropId);
    router.push(`/crop-details/${cropId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TopNav bgColor={theme.background} color={theme.text} title="All Crops" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cropGrid}>
          {crops.map((crop) => (
            <View key={crop.id} style={styles.cropGridItem}>
              <InfoCard
                title={crop.name[language]}
                emoji={crop.emoji}
                imageUrl={crop.imageUrl}
                onPress={() => handleCropPress(crop.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default viewCrops;

// const styles = StyleSheet.create({})
