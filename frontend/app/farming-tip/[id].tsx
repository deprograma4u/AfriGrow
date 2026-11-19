import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { farmingTips } from '@/mocks/farming-tips';
import TopNav from '@/components/TopNav';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from '@/hooks/useTranslation';

export default function FarmingTipScreen() {
    const { language, t } = useTranslation();
    const { id } = useLocalSearchParams<{ id: string }>();
    const tip = farmingTips.find(t => t.id === id);
    const theme = useTheme();

    if (!tip) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <TopNav
                    color={theme.text}
                    bgColor={theme.cardBackground}
                    title={"Tip Not Found"}
                />
                <View style={styles.notFound}>
                    <Text style={[styles.notFoundText, { color: theme.text }]}>Farming tip not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['bottom']}>
            {/* <Stack.Screen options={{ title: tip.title }} /> */}
            
            <TopNav
                color={theme.text}
                bgColor={theme.cardBackground}
                title={tip.title[language]}
            />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={tip.imageUrl}
                    style={styles.image}
                    contentFit="cover"
                    transition={300}
                />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.emoji}>{tip.emoji}</Text>
                        <Text style={[styles.title, { color: theme.text }]}>{tip.title[language]}</Text>
                    </View>

                    <Text style={[styles.description, { color: theme.text }]}>{tip.description[language]}</Text>

                    <View style={[styles.detailsContainer, { backgroundColor: theme.cardBackground }]}>
                        {/* {
                            tipsTranslation.map((tip, index) => (
                                <>
                                </>
                            ))
                        } */}
                        <Text style={[styles.detailsTitle, { color: theme.text }]}>{t("whyThisMatters", "tips")}:</Text>
                        <Text style={[styles.detailsText, { color: theme.text }]}>
                            {t("followThisPractice", "analysis")}
                        </Text>

                        <Text style={[styles.detailsTitle, { color: theme.text }]}>{t("howToImplement", "tips")}:</Text>
                        <View style={styles.stepItem}>
                            <Text style={[styles.stepNumber, {color: theme.primary}]}>1</Text>
                            <Text style={[styles.stepText, {color: theme.text}]}>{t("step1", "tips")}</Text>
                        </View>
                        <View style={styles.stepItem}>
                            <Text style={[styles.stepNumber, {color: theme.primary}]}>2</Text>
                            <Text style={[styles.stepText, {color: theme.text}]}>{t("step2", "tips")}</Text>
                        </View>
                        <View style={styles.stepItem}>
                            <Text style={[styles.stepNumber, {color: theme.primary}]}>3</Text>
                            <Text style={[styles.stepText, {color: theme.text}]}>{t("step3", "tips")}</Text>
                        </View>
                        <View style={styles.stepItem}>
                            <Text style={[styles.stepNumber, {color: theme.primary}]}>4</Text>
                            <Text style={[styles.stepText, {color: theme.text}]}>{t("step4", "tips")}</Text>
                        </View>
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    image: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: 16,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    detailsContainer: {
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 16,
    },
    detailsText: {
        fontSize: 14,
        lineHeight: 22,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        color: 'white',
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: 'bold',
        marginRight: 12,
    },
    stepText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 28,
    },
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundText: {
        fontSize: 18,
    },
});