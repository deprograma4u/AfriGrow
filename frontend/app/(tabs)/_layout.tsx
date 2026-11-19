import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { User, MessageCircle, Camera, BookOpen } from "lucide-react-native";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <>
      {/* <StatusBar style={theme.isDark ? "light" : "dark"} /> */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.iconLight,
          tabBarStyle: {
            ...styles.tabBar,
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.border,
          },
          tabBarLabelStyle: styles.tabBarLabel,
          headerStyle: {
            ...styles.header,
            backgroundColor: theme.cardBackground,
            borderBottomColor: theme.border,
          },
          headerTitleStyle: {
            ...styles.headerTitle,
          },
          headerTintColor: theme.primary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            // title: t("farmGuide", "common"),
            tabBarLabel: t("guide", "common"),
            tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="chatbot"
          options={{
            title: "Farm Assistant",
            tabBarLabel: t("farmAssistant", "common"),
            tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} />,
          }}
        />
        {/* <Tabs.Screen
          name="scanner"
          options={{
            title: "Farm Scanner",
            tabBarLabel: t("scanner", "common"),
            tabBarIcon: ({ color }) => <Camera size={24} color={color} />,
          }}
        /> */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingHorizontal: 8,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  header: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});