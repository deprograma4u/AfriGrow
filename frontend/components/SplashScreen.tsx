import { Image, Text, View } from 'react-native'
import React from 'react'
import { styles } from '@/constants/styles'

const SplashScreen = () => {
  return (
    <View style={[styles.container, styles.justifyCenter, styles.alignCenter, {gap: 20}]}>
      {/* <Text style={[styles.h1]}>Logo</Text> */}
      <Image
        source={require("@/assets/images/favicon.png")}
        // width={100}
        // height={100}
      />
      <Text style={[styles.small, {color: "grey"}]}>the farmers friend</Text>
    </View>
  )
}

export default SplashScreen
