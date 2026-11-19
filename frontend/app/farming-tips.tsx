import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "@/constants/styles";
import { farmingTips } from "@/mocks/farming-tips";
import InfoCard from "@/components/InfoCard";
import { useRouter } from "expo-router";
import TopNav from "@/components/TopNav";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "@/hooks/useTranslation";

const FarmingTips = () => {
  const router = useRouter();
  const theme = useTheme();
  const { language } = useTranslation();

  const handleTipPress = (tipId: string) => {
    router.push(`/farming-tip/${tipId}`);
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TopNav
        bgColor={theme.background}
        color={theme.text}
        title="Farming Tips"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {farmingTips.map((tip) => (
          <InfoCard
            key={tip.id}
            title={tip.title[language]}
            emoji={tip.emoji}
            imageUrl={tip.imageUrl}
            description={tip.description[language]}
            onPress={() => handleTipPress(tip.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FarmingTips;
