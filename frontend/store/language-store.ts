import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '@/constants/translations';

export type LanguageType = 'en' | 'tw';

interface LanguageState {
    language: LanguageType;
    setLanguage: (language: LanguageType) => void;
    translate: (key: string, category: string) => string;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set, get) => ({
            language: 'en',
            setLanguage: (language) => set({ language }),
            translate: (key, category) => {
                const currentLanguage = get().language;
                try {
                    // @ts-ignore - We're using string keys for dynamic access
                    const translation = translations[category][key][currentLanguage];
                    return translation || key;
                } catch (error) {
                    console.warn(`Translation not found for ${category}.${key}.${currentLanguage}`);
                    return key;
                }
            }
        }),
        {
            name: 'language-settings',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);