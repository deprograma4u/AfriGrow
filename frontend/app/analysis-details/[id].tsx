import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { Share2 } from "lucide-react-native";
import { cropAnalysisResults } from "@/mocks/crop-analysis";
import { crops } from "@/mocks/crops";
import TopNav from "@/components/TopNav";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "@/hooks/useTranslation";

export default function AnalysisDetailScreen() {
  const { t, language } = useTranslation();
  const Colors = useTheme();
  const { id } = useLocalSearchParams<({ id: string })>();
  const router = useRouter();
  const analysis = cropAnalysisResults.find((a) => a.id === id);
  const crop = analysis
    ? crops.find((c) => c.name === analysis.cropName)
    : null;

  if (!analysis || !crop) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
        <Stack.Screen options={{ title: "Analysis Not Found" }} />
        <View style={styles.notFound}>
          <Text style={[styles.notFoundText, { color: Colors.text }]}>Analysis result not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusColor = () => {
    switch (analysis.condition["en"]) {
      case "healthy":
        return Colors.success;
      case "pest":
      case "disease":
        return Colors.error;
      case "nutrient":
        return Colors.warning;
      case "water":
        return Colors.info;
      default:
        return Colors.primary;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={["bottom"]}>
      
      <TopNav 
        color={Colors.text} 
        bgColor={Colors.background} 
        title={`${crop.name} Analysis`} 
        headerRight={(
          <TouchableOpacity>
            <Share2 size={20} color={Colors.text} />
          </TouchableOpacity>
        )}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: analysis.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        {/* <View> */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.titleContainer]}>
              <Text style={styles.emoji}>{analysis.emoji}</Text>
              <View style={[styles.titleContainer, {gap: 10}]}>
                <Text style={[styles.title, { color: Colors.text }]}>{crop.name[language]}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor()},
                  ]}
                >
                  <Text style={styles.statusText}>{analysis.condition[language]}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.section, {backgroundColor: Colors.cardBackground}]}>
            <Text style={[styles.sectionTitle, {color: Colors.text}]}>Diagnosis</Text>
            <Text style={[styles.description, {color: Colors.text}]}>{analysis.description[language]}</Text>
          </View>

          <View style={[styles.section, {backgroundColor: Colors.cardBackground}]}>
            <Text style={[styles.sectionTitle, {color: Colors.text}]}>Recommendations</Text>
            {analysis.recommendations[language].map((recommendation: any, index: any) => (
              <View key={index} style={styles.recommendationItem}>
                <Text style={[styles.recommendationNumber, {color: Colors.primary}]}>{index + 1}</Text>
                <Text style={[styles.recommendationText, {color: Colors.text}]}>{recommendation}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.section, {backgroundColor: Colors.cardBackground}]}>
            <Text style={[styles.sectionTitle, {color: Colors.text}]}>{t("additionalResources", "analysis")}</Text>
            <TouchableOpacity
              style={[styles.resourceButton, { backgroundColor: Colors.background, borderColor: Colors.border }]}
              onPress={() => router.push(`/crop-details/${crop.id}`)}
            >
              <Text style={styles.resourceEmoji}>{crop.emoji}</Text>
              <View style={styles.resourceInfo}>
                <Text style={[styles.resourceTitle, {color: Colors.text}]}>
                  {crop.name[language]} {t("growingGuide", "analysis")}
                </Text>
                <Text style={[styles.resourceDescription, {color: Colors.textLight}]}>
                  Learn how to grow healthy {crop.name[language]}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.resourceButton, { backgroundColor: Colors.background, borderColor: Colors.border }]}>
              <Text style={styles.resourceEmoji}>🌱</Text>
              <View style={styles.resourceInfo}>
                <Text style={[styles.resourceTitle, {color: Colors.text}]}>
                  {analysis.condition["en"] === "healthy"
                    ? "Maintenance Tips"
                    : `${
                        analysis.condition[language].charAt(0).toUpperCase() +
                        analysis.condition[language].slice(1)
                      } Management`}
                </Text>
                <Text style={[styles.resourceDescription, {color: Colors.textLight}]}>
                  {analysis.condition["en"] === "healthy"
                    ? t("keepHealthy", "analysis")
                    : t("howToAddress", "analysis")
                    // `How to address ${analysis.condition} issues in crops`
                  }
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shareButton: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 40,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  section: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  recommendationItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  recommendationNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    color: "white",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "bold",
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  resourceButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  resourceEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resourceDescription: {
    fontSize: 14,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
