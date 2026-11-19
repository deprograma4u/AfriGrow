import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppStore } from '@/store/app-store'
import SplashScreen from '@/components/SplashScreen'
import Welcome from './welcome'
import { useRouter } from 'expo-router'

const index = () => {
    const {userProfile} = useAppStore()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    // clearUserProfile()
    useEffect(()=>{
        try{
            
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)

        } catch(e){
        } finally {
        }
    }, [])

    useEffect(() => {
        if (!isLoading && userProfile.isLoggedIn) {
            router.replace("/(tabs)/" as never)
        }
    }, [isLoading, userProfile.isLoggedIn])

  return (
    <>
        {
            isLoading ? <SplashScreen /> : !userProfile.isLoggedIn ? <Welcome /> : null
        }
    </>
  )
}

export default index
