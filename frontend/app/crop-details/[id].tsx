import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { crops } from '@/mocks/crops';
import CropDetailCard from '@/components/CropDetailCard';
import { useTheme } from '@/components/ThemeProvider';
import TopNav from '@/components/TopNav';
import { useTranslation } from '@/hooks/useTranslation';

export default function CroppetalScreen() {
    const { language } = useTranslation();
    const theme = useTheme();
    const { id } = useLocalSearchParams<{ id: string }>();
    const crop = crops.find(c => c.id === id);

    if (!crop) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
                {/* <Stack.Screen options={{ title: "Crop Not Found" }} /> */}
                <TopNav color={theme.text} bgColor={theme.background} title={"Crop Not Found"} />
                <View style={styles.notFound}>
                    <Text style={[styles.notFoundText, {color: theme.text}]}>Crop not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]} edges={['bottom']}>
            {/* <Stack.Screen options={{ title: crop.name }} /> */}
            <TopNav color={theme.text} bgColor={theme.background} title={crop.name[language]} />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <CropDetailCard crop={crop} />
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
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundText: {
        fontSize: 16,
    },
});