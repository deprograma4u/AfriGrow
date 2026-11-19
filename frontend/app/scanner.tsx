import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  Camera,
  Image as ImageIcon,
  Clock,
  AlertCircle,
  Trash2,
} from "lucide-react-native";
import { useTheme } from "@/components/ThemeProvider";
import Emojis from "@/constants/emojis";
import { useAppStore } from "@/store/app-store";
import { cropAnalysisResults } from "@/mocks/crop-analysis";
import { crops } from "@/mocks/crops";
import AnalysisResult from "@/components/AnalysisResults";
import TopNav from "@/components/TopNav";
import { useTranslation } from "@/hooks/useTranslation";
// import AnalysisResult from "@/components/AnalysisResult";

export default function ScannerScreen() {
  const Colors = useTheme();
  const router = useRouter();
  const {t, language} = useTranslation();
  const { scanHistory, addScanToHistory, clearScanHistory } = useAppStore();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You need to grant camera permission to use the scanner!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You need to grant gallery permission to select images!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const analyzeImage = (imageUrl: string) => {
    setAnalyzing(true);
    setAnalysisResult(null);

    // Simulate analysis delay
    setTimeout(() => {
      // Randomly select an analysis result
      const randomIndex = Math.floor(
        Math.random() * cropAnalysisResults.length
      );
      const analysis = cropAnalysisResults[randomIndex];

      // Find the corresponding crop
      const crop = crops.find((c) => c.name[language] === analysis.cropName[language]);
      if (crop) {
        // Add to scan history
        addScanToHistory(crop.id, imageUrl, analysis.id);
        setAnalysisResult(analysis.id);
      }
      setAnalyzing(false);
    }, 2000);
  };

  const getAnalysisResult = () => {
    if (!analysisResult) return null;
    return cropAnalysisResults.find((result) => result.id === analysisResult);
  };

  const result = getAnalysisResult();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.background }]}
      edges={["bottom"]}
    >
      {/* <Stack.Screen
        options={{
          headerTitle: "Crop Scanner",
        }}
      /> */}
      <TopNav
        color={Colors.text}
        bgColor={Colors.cardBackground} 

      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scanSection}>
          {image ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={styles.image}
                contentFit="cover"
                transition={300}
              />
              {analyzing && (
                <View style={styles.analyzingOverlay}>
                  <ActivityIndicator size="large" color={Colors.primary} />
                  <Text style={styles.analyzingText}>Analyzing crop...</Text>
                </View>
              )}
            </View>
          ) : (
            <View
              style={[
                styles.placeholderContainer,
                {
                  backgroundColor: Colors.cardBackground,
                  borderColor: Colors.border,
                },
              ]}
            >
              <Text style={styles.emoji}>{Emojis.camera}</Text>
              <Text style={[styles.placeholderTitle, { color: Colors.text }]}>
                Scan Your Crops
              </Text>
              <Text
                style={[styles.placeholderText, { color: Colors.textLight }]}
              >
                Take a picture of your crops to get instant analysis and farming
                recommendations.
              </Text>
            </View>
          )}

          <View style={[styles.buttonContainer, {gap: 10}]}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.primary }]}
              onPress={takePicture}
            >
              <Camera size={24} color="white" />
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: Colors.background,
                  borderColor: Colors.border,
                },
              ]}
              onPress={pickImage}
            >
              <ImageIcon size={24} color={Colors.text} />
              <Text style={[styles.buttonText, { color: Colors.text }]}>
                Choose from Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {result && (
          <View style={styles.resultSection}>
            <Text
              style={[
                styles.buttonText,
                styles.galleryButtonText,
                { color: Colors.text },
              ]}
            >
              Analysis Result
            </Text>
            <AnalysisResult
              analysis={result}
              onViewDetails={() =>
                router.push(`/analysis-details/${result.id}`)
              }
            />
          </View>
        )}

        {scanHistory.length > 0 && (
          <View style={styles.historySection}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <Text style={[styles.sectionTitle, { color: Colors.text }]}>Recent Scans</Text>
              <TouchableOpacity
                style={{marginRight: 10, flexDirection: "row", alignItems: "center", gap: 5}}
                onPress={clearScanHistory}
              >
                <Trash2 size={20} color={Colors.text} />
                <Text style={{color: Colors.text}} >Clear All</Text>
              </TouchableOpacity>
            </View>

            {scanHistory.slice(0, 3).map((scan) => {
              const analysis = cropAnalysisResults.find(
                (a) => a.id === scan.analysisId
              );
              const crop = crops.find((c) => c.id === scan.cropId);

              if (!analysis || !crop) return null;

              return (
                <TouchableOpacity
                  key={scan.id}
                  style={[styles.historyItem, { backgroundColor: Colors.cardBackground }]}
                  onPress={() =>
                    router.push(`/analysis-details/${scan.analysisId}`)
                  }
                >
                  <Image
                    source={{ uri: scan.imageUrl }}
                    style={styles.historyImage}
                    contentFit="cover"
                  />
                  <View style={styles.historyInfo}>
                    <Text style={[styles.historyTitle, { color: Colors.text }]}>
                      {crop.name[language]} {crop.name[language]}
                    </Text>
                    <View style={styles.historyDetails}>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor:
                              analysis.condition[`${language}`] === "healthy"
                                ? Colors.success
                                : Colors.error,
                          },
                        ]}
                      >
                        <Text style={[styles.statusText, { color: Colors.textLight }]}>
                          {analysis.condition[`${language}`]}
                        </Text>
                      </View>
                      <View style={styles.timeContainer}>
                        <Clock size={12} color={Colors.textLight} />
                        <Text style={[styles.timeText, { color: Colors.textLight }]}>
                          {new Date(scan.timestamp).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            {scanHistory.length > 3 && (
              <TouchableOpacity
                style={[styles.viewAllButton, { backgroundColor: Colors.cardBackground }]}
                onPress={() => router.push("/scan-history")}
              >
                <Text style={[styles.viewAllText, { color: Colors.primary }]}>View All Scans</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  scanSection: {
    marginBottom: 24,
  },
  imageContainer: {
    height: 250,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  analyzingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  placeholderContainer: {
    height: 250,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderStyle: "dashed",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
  },
  cameraButton: {
    // backgroundColor: Colors.primary,
    marginRight: 8,
  },
  galleryButton: {
    // backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    // borderColor: Colors.border,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
  },
  galleryButtonText: {
  },
  resultSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    
  },
  historySection: {
    marginBottom: 24,
  },
  historyItem: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyImage: {
    width: 80,
    height: 80,
  },
  historyInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  historyDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    // color: Colors.textLight,
    marginLeft: 4,
  },
  viewAllButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  viewAllText: {
    fontWeight: "600",
  },
  tipsSection: {
    // backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    // borderColor: Colors.border,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    // color: Colors.text,
    marginLeft: 8,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    marginRight: 8,
    // color: Colors.primary,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 28,
    // color: Colors.text,
  },
});
