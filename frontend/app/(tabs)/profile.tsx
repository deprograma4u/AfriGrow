import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import {
  User,
  MapPin,
  Settings,
  Moon,
  Sun,
  Bell,
  Globe,
  Volume2,
  Database,
  ChevronRight,
  Camera,
  LogOut,
} from 'lucide-react-native';
import { useAppStore } from '@/store/app-store';
import { useThemeStore } from '@/store/theme-store';
import { useTheme } from '@/components/ThemeProvider';
import Emojis from '@/constants/emojis';
import TopNav from '@/components/TopNav';
import { CustomAlert } from '@/components/CustomAlert';
import { useTranslation } from '@/hooks/useTranslation';
import { ThemeType } from '@/constants/themes';
import { LanguageType } from '@/store/language-store';
import { useRouter } from 'expo-router';


export default function ProfileScreen() {
  const router = useRouter()
  const theme = useTheme();
  const { userProfile, appSettings, setUserProfile, setAppSettings } = useAppStore();
  const { themeMode, toggleTheme, setThemeMode } = useThemeStore();
  const {t, setLanguage, language} = useTranslation()

  const [showThemeAlert, setShowThemeAlert] = useState(false);
  const [showLanguageAlert, setShowLanguageAlert] = useState(false);

  const [isPickingImage, setIsPickingImage] = useState(false);

  const themeModes = [
    {
      label: 'Light Mode',
      value: 'light' as ThemeType,
      icon: <Sun size={20} color={theme.text} />,
    },
    {
      label: 'Dark Mode',
      value: 'dark' as ThemeType,
      icon: <Moon size={20} color={theme.text} />,
    },
    {
      label: 'System Default',
      value: 'system' as ThemeType,
      icon: <Globe size={20} color={theme.text} />,
    }
  ]

  const languageOptions = [
    {
      label: 'Twi',
      value: 'tw' as LanguageType,
      icon: <Sun size={20} color={theme.text} />,
    },
    {
      label: 'English',
      value: 'en' as LanguageType,
    },
  ]

  const pickImage = async () => {
    setIsPickingImage(true);

    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "You need to grant gallery permission to change your profile picture.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setUserProfile({ avatar: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting your image. Please try again.");
    } finally {
      setIsPickingImage(false);
    }
  };

  const renderThemeOption = () => {
    let icon, label;

    switch (themeMode) {
      case 'light':
        icon = <Sun size={20} color={theme.text} />;
        label = "Light Mode";
        break;
      case 'dark':
        icon = <Moon size={20} color={theme.text} />;
        label = "Dark Mode";
        break;
      case 'system':
      default:
        icon = <Settings size={20} color={theme.text} />;
        label = "System Default";
        break;
    }

    return (
      <View style={[styles.settingOptionContent, {gap: 10}]}>
        {icon}
        <Text style={[styles.settingOptionText, { color: theme.text }]}>{label}</Text>
      </View>
    );
  };

  const showDataUsageOptions = () => {
    Alert.alert(
      "Data Usage",
      "Select your preferred data usage level",
      [
        {
          text: "Low (Save Data)",
          onPress: () => setAppSettings({ dataUsage: "low" }),
        },
        {
          text: "Medium Mode",
          onPress: () => setAppSettings({ dataUsage: "medium" }),
        },
        {
          text: "High Mode",
          onPress: () => setAppSettings({ dataUsage: "high" }),
        },
        // {
        //   text: "Online Mode",
        //   onPress: () => setAppSettings({ dataUsage: "medium" }),
        // },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  }

  const showLanguageOptions = () => {
    Alert.alert(
      "Choose Language",
      "Select your preferred language",
      [
        {
          text: "English",
          onPress: () => setAppSettings({ language: "English" }),
        },
        {
          text: "Twi",
          onPress: () => setAppSettings({ language: "Akan Twi" }),
        }
      ]
    );
  };

  const showLogoutConfirmation = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            // Handle logout logic here
            Alert.alert("Logged Out", "You have successfully logged out.", [
              { text: "OK", onPress: () => {
                setUserProfile({
                  name: '',
                  isLoggedIn: false
                });
    
                setLanguage('' as LanguageType);
    
                router.push("/welcome" as never)
              } },
            ]);
            
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['bottom']}>
      
      <TopNav 
        color={theme.text}
        bgColor={theme.cardBackground}
        title='Profile' 
        headerRight={<TouchableOpacity 
          // style={styles.headerButton}
        >
          <Settings size={24} color={theme.text} />
        </TouchableOpacity>} 
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.avatarContainer}>
            {userProfile?.avatar ? (
              <Image
                source={{ uri: userProfile?.avatar }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: theme.primary + '20' }]}>
                <User size={40} color={theme.primary} />
              </View>
            )}
            <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
              <Camera size={16} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.text }]}>{userProfile?.name}</Text>
            <View style={styles.profileDetail}>
              <MapPin size={16} color={theme.textLight} />
              <Text style={[styles.profileDetailText, { color: theme.textLight }]}>{userProfile?.location}</Text>
            </View>
            <View style={styles.farmDetails}>
              <View style={styles.farmDetail}>
                <Text style={[styles.farmDetailLabel, { color: theme.textLight }]}>Farm Size</Text>
                <Text style={[styles.farmDetailValue, { color: theme.text }]}>{userProfile?.farmSize}</Text>
              </View>
              <View style={styles.farmDetail}>
                <Text style={[styles.farmDetailLabel, { color: theme.textLight }]}>Experience</Text>
                <Text style={[styles.farmDetailValue, { color: theme.text }]}>
                  {userProfile?.experience.charAt(0).toUpperCase() + userProfile?.experience.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Main Crops */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Main Crops {Emojis.crops}</Text>
          <View style={styles.cropTags}>
            {userProfile?.mainCrops.map((crop, index) => (
              <View key={index} style={[styles.cropTag, { backgroundColor: theme.primary + '20' }]}>
                <Text style={[styles.cropTagText, { color: theme.primary }]}>{crop}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.cropTag, { backgroundColor: theme.border }]}
              onPress={() => {
                // In a real app, you would show a modal to add crops
                Alert.alert("Add crop", "This would open a crop selection screen.");
              }}
            >
              <Text style={[styles.cropTagText, { color: theme.text }]}>+ Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Settings */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>App Settings {Emojis.tools}</Text>

          {/* Theme */}
          <TouchableOpacity
            style={[styles.settingOption, { borderBottomColor: theme.border }]}
            onPress={()=> setShowThemeAlert(true)}
          >
            <View style={styles.settingOptionIcon}>
              {themeMode === 'dark' ? (
                <Moon size={20} color={theme.text} />
              ) : (
                <Sun size={20} color={theme.text} />
              )}
            </View>
            <View style={styles.settingOptionContent}>
              <Text style={[styles.settingOptionLabel, { color: theme.text }]}>Theme</Text>
              {renderThemeOption()}
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>

          {/* Language */}
          <TouchableOpacity
            style={[styles.settingOption, { borderBottomColor: theme.border }]}
            onPress={()=> setShowLanguageAlert(true)}
          >
            <View style={styles.settingOptionIcon}>
              <Globe size={20} color={theme.text} />
            </View>
            <View style={styles.settingOptionContent}>
              <Text style={[styles.settingOptionLabel, { color: theme.text }]}>Language</Text>
              <Text style={[styles.settingOptionText, { color: theme.text }]}>{language}</Text>
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>

          {/* Notifications */}
          <View style={[styles.settingOption, { borderBottomColor: theme.border }]}>
            <View style={styles.settingOptionIcon}>
              <Bell size={20} color={theme.text} />
            </View>
            <View style={[styles.settingOptionContent, {flexDirection: "column"}]}>
              <Text style={[styles.settingOptionLabel, { color: theme.text }]}>Notifications</Text>
              <Text style={[styles.settingOptionText, { color: theme.textLight }]}>
                Weather alerts, crop reminders
              </Text>
            </View>
            <Switch
              value={appSettings?.notificationsEnabled}
              onValueChange={(value) => setAppSettings({ notificationsEnabled: value })}
              trackColor={{ false: theme.border, true: theme.primary + '80' }}
              thumbColor={appSettings?.notificationsEnabled ? theme.primary : theme.textLight}
            />
          </View>

          {/* Audio Feedback */}
          <View style={[styles.settingOption, { borderBottomColor: theme.border }]}>
            <View style={styles.settingOptionIcon}>
              <Volume2 size={20} color={theme.text} />
            </View>
            <View style={[styles.settingOptionContent, {flexDirection: "column"}]}>
              <Text style={[styles.settingOptionLabel, { color: theme.text }]}>Audio Feedback</Text>
              <Text style={[styles.settingOptionText, { color: theme.textLight }]}>
                Voice responses and sounds
              </Text>
            </View>
            <Switch
              value={appSettings?.audioFeedback}
              onValueChange={(value) => setAppSettings({ audioFeedback: value })}
              trackColor={{ false: theme.border, true: theme.primary + '80' }}
              thumbColor={appSettings?.audioFeedback ? theme.primary : theme.textLight}
            />
          </View>

          {/* Data Usage */}
          <TouchableOpacity
            style={[styles.settingOption, { borderBottomColor: theme.border }]}
            onPress={showDataUsageOptions}
          >
            <View style={styles.settingOptionIcon}>
              <Database size={20} color={theme.text} />
            </View>
            <View style={styles.settingOptionContent}>
              <Text style={[styles.settingOptionLabel, { color: theme.text }]}>Data Usage</Text>
              <Text style={[styles.settingOptionText, { color: theme.text }]}>
                {appSettings?.dataUsage.charAt(0).toUpperCase() + appSettings?.dataUsage.slice(1)}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>
        </View>

        {/* Account */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Account {Emojis.farmer}</Text>

          {/* Edit Profile */}
          <TouchableOpacity
            style={[styles.settingOption, { borderBottomColor: theme.border }]}
            // onPress={() => {
            //   // In a real app, you would navigate to edit profile screen
            //   Alert.alert("Edit Profile", "This would open the profile editing screen.");
            // }}
          >
            <View style={styles.settingOptionIcon}>
              <User size={20} color={theme.text} />
            </View>
            <View style={[styles.settingOptionContent, {flexDirection: "column"}]}>
              <Text style={[styles.settingOptionLabel, { color: theme.text }]}>Edit Profile</Text>
              <Text style={[styles.settingOptionText, { color: theme.textLight }]}>
                Change name, location, farm details
              </Text>
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity
            style={styles.settingOption}
            onPress={showLogoutConfirmation}
          >
            <View style={styles.settingOptionIcon}>
              <LogOut size={20} color={theme.error} />
            </View>
            <View style={styles.settingOptionContent}>
              <Text style={[styles.settingOptionLabel, { color: theme.error }]}>Log Out</Text>
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>
        </View>

        {/* Version */}
        <Text style={[styles.versionText, { color: theme.textLight }]}>
          Farm Assistant v1.0.0
        </Text>

      </ScrollView>

      <CustomAlert
        title="Choose Theme"
        content={(
          themeModes.map((mode, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setThemeMode(mode.value)
                setShowThemeAlert(false)
              }}
              style={styles.themeOption}
            >
              {mode.icon}
              <Text style={[styles.themeOptionText, { color: theme.text }]}>{mode.label}</Text>
            </TouchableOpacity>
          ))
        )}
        visible={showThemeAlert}
        onClose={() => setShowThemeAlert(false)}
        bgColor={theme.background}
        color={theme.text}
        border={theme.border}
      />

      <CustomAlert
        title="Choose Language"
        content={(
          languageOptions.map((language, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setLanguage(language.value)
                setAppSettings({language: language.value})
                setShowLanguageAlert(false)
              }}
              style={styles.themeOption}
            >
              <Text style={[styles.themeOptionText, { color: theme.text }]}>{language.label}</Text>
            </TouchableOpacity>
          ))
        )}
        visible={showLanguageAlert}
        onClose={() => setShowLanguageAlert(false)}
        bgColor={theme.background}
        color={theme.text}
        border={theme.border}
      />
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
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
  },
  themeOptionText: {
    fontSize: 16,
    marginLeft: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileDetailText: {
    marginLeft: 4,
    fontSize: 14,
  },
  farmDetails: {
    flexDirection: 'row',
  },
  farmDetail: {
    marginRight: 16,
  },
  farmDetailLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  farmDetailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cropTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  cropTagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingOptionIcon: {
    width: 40,
    alignItems: 'center',
  },
  settingOptionContent: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  settingOptionLabel: {
    fontSize: 16,
    flex: 1,
  },
  settingOptionText: {
    fontSize: 14,
  },
  versionText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
  },
});