import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
  name: string;
  avatar: string | null;
  location: string;
  farmSize: string;
  isLoggedIn: boolean;
  mainCrops: string[];
  experience: "beginner" | "intermediate" | "expert";
}

interface AppSettings {
  language: string;
  notificationsEnabled: boolean;
  weatherAlerts: boolean;
  cropReminders: boolean;
  dataUsage: "low" | "medium" | "high";
  audioFeedback: boolean;
}

interface AppState {
  // User info
  userProfile: UserProfile;

  // App settings
  appSettings: AppSettings;

  // Agricultural info
  selectedCrop: string | null;
  favoriteCrops: string[];
  recentlyViewedCrops: string[];

  // Chatbot
  chatHistory: {
    id: string;
    message?: string;
    uri?: string |  null;
    isUser?: boolean;
    timestamp: number;
    emoji?: string;
    isAudio?: boolean;
  }[];
  isRecording: boolean;

  // Crop scanner
  scanHistory: {
    id: string;
    cropId: string;
    imageUrl: string;
    analysisId: string;
    timestamp: number;
  }[];


  // Actions - User
  setUserProfile: (profile: Partial<UserProfile>) => void;
  clearUserProfile: () => void;

  // Actions - Settings
  setAppSettings: (settings: Partial<AppSettings>) => void;

  // Actions - Crops
  setSelectedCrop: (cropId: string | null) => void;
  toggleFavoriteCrop: (cropId: string) => void;
  addRecentlyViewedCrop: (cropId: string) => void;

  addChatMessage: (message?: string, isUser?: boolean, emoji?: string, isAudio?: boolean, uri?: string | null) => void;
  clearChatHistory: () => void;
  setIsRecording: (isRecording: boolean) => void;

  addScanToHistory: (cropId: string, imageUrl: string, analysisId: string) => void;
  clearScanHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({

      // Initial state - User Profile
      userProfile: {
        name: "",
        avatar: null,
        location: "",
        farmSize: "",
        mainCrops: [],
        experience: "beginner",
        isLoggedIn: false,
      },

      // Initial state - App Settings
      appSettings: {
        language: "en",
        notificationsEnabled: true,
        weatherAlerts: true,
        cropReminders: true,
        dataUsage: "medium",
        audioFeedback: true,
      },

      // Initial state - Crops
      selectedCrop: null,
      favoriteCrops: [],
      recentlyViewedCrops: [],

      chatHistory: [],
      isRecording: false,

      scanHistory: [],

      // Actions - User
      setUserProfile: (profile) => set((state: any) => ({
        userProfile: { ...state.userProfile, ...profile }
      })),
      clearUserProfile: () => set({ userProfile: {
        name: "",
        avatar: null,
        location: "",
        farmSize: "",
        mainCrops: [],
        experience: "beginner",
        isLoggedIn: false,
      } }),

      // Actions - Settings
      setAppSettings: (settings) => set((state: any) => ({
        appSettings: { ...state.appSettings, ...settings }
      })),

      // Actions - Crops
      setSelectedCrop: (cropId) => set({ selectedCrop: cropId }),
      toggleFavoriteCrop: (cropId) =>
        set((state) => {
          if (state.favoriteCrops.includes(cropId)) {
            return { favoriteCrops: state.favoriteCrops.filter((id) => id !== cropId) };
          } else {
            return { favoriteCrops: [...state.favoriteCrops, cropId] };
          }
        }),

      addRecentlyViewedCrop: (cropId) =>
        set((state) => {
          const filtered = state.recentlyViewedCrops.filter((id) => id !== cropId);
          return { recentlyViewedCrops: [cropId, ...filtered].slice(0, 5) };
        }),

      addChatMessage: (message, isUser, emoji, isAudio, uri) =>
        set((state) => ({
          chatHistory: [
            ...state.chatHistory,
            { id: Date.now().toString(), message, isUser, timestamp: Date.now(), emoji, isAudio: isAudio, uri: uri},
          ],
        })),
      clearChatHistory: () => set({ chatHistory: [] }),
      setIsRecording: (isRecording) => set({ isRecording }),

      addScanToHistory: (cropId, imageUrl, analysisId) =>
        set((state) => ({
          scanHistory: [
            { id: Date.now().toString(), cropId, imageUrl, analysisId, timestamp: Date.now() },
            ...state.scanHistory,
          ],
        })),
      clearScanHistory: () => set({ scanHistory: [] }),
    }),
    
    {
      name: 'farm-assistant-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);