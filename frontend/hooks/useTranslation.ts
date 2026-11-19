import { useLanguageStore } from "@/store/language-store";

export function useTranslation() {
    const {language, setLanguage, translate} = useLanguageStore();

    return {
        language,
        setLanguage,
        t: translate,
        isEnglish: language === 'en',
        isTwi: language === 'tw'
    }
}