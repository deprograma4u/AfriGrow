import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Languages } from 'lucide-react-native'
import { useTranslation } from '@/hooks/useTranslation'

const TopNav = ({bgColor, color, title, headerRight, langIcon}:{color?: string, bgColor?: string, title?: string, langIcon?: boolean, headerRight?: React.ReactNode}) => {
  const {setLanguage, language} = useTranslation()
  
  const changeLanguage = () => {
    console.log(language)
    setLanguage(language === "tw" ? "en" : "tw")
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: title,
          headerStyle: {
            backgroundColor: bgColor,
          },
          headerTitleStyle: {
            color: color,
          },
          headerTintColor: color, // Change the color of the back icon
          headerRight: () => (
            <View style={[{marginRight: 20, flexDirection: "row"}]}>
                
                {
                  langIcon && <TouchableOpacity
                  style={{
                    marginRight: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                  onPress={changeLanguage}
                >
                  {/* <Trash2 size={20} color={theme.text} />
                  <Text style={{ color: theme.text }}>Clear All</Text> */}
                  <Languages size={20} color={color} />
                </TouchableOpacity>
                }
                {headerRight}
            </View>
          ),
        }}
      />
    </>
  )
}

export default TopNav

const styles = StyleSheet.create({})