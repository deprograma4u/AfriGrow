import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Trash2 } from 'lucide-react-native';
import { useAppStore } from '@/store/app-store';
import { cropAnalysisResults } from '@/mocks/crop-analysis';
import { crops } from '@/mocks/crops';
import { useTheme } from '@/components/ThemeProvider';


export default function ScanHistoryScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { scanHistory, clearScanHistory } = useAppStore();

  const renderItem = ({ item }:{item: any }) => {
    const analysis = cropAnalysisResults.find(a => a.id === item.analysisId);
    const crop = crops.find(c => c.id === item.cropId);

    if (!analysis || !crop) return null;

    const getStatusColor = () => {
      switch (analysis.condition) {
        case 'healthy':
          return theme.success;
        case 'pest':
        case 'disease':
          return theme.error;
        case 'nutrient':
          return theme.warning;
        case 'water':
          return theme.info;
        default:
          return theme.primary;
      }
    };

    return (
      <TouchableOpacity
        style={styles.historyItem}
        onPress={() => router.push(`/analysis-details/${item.analysisId}`)}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.historyImage}
          contentFit="cover"
        />
        <View style={styles.historyInfo}>
          <Text style={styles.historyTitle}>{crop.name} {crop.emoji}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{analysis.condition}</Text>
          </View>
          <Text style={styles.dateText}>
            {new Date(item.timestamp).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: "Scan history",
          headerRight: () => (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearScanHistory}
            >
              <Trash2 size={28} color={theme.text} />
            </TouchableOpacity>
          ),
        }}
      />

      {scanHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No scan history yet</Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => router.push('/scanner')}
          >
            <Text style={styles.scanButtonText}>Scan a crop</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={scanHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.background,
  },
  clearButton: {
    marginRight: 16,
  },
  listContent: {
    padding: 16,
  },
  historyItem: {
    flexDirection: 'row',
    // backgroundColor: theme.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyImage: {
    width: 100,
    height: 100,
  },
  historyInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: theme.text,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  dateText: {
    fontSize: 14,
    // color: theme.textLight,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    // color: theme.textLight,
    marginBottom: 24,
  },
  scanButton: {
    // backgroundColor: theme.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});