import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlayButton from './PlayButton';
import { NetworkInfo } from "react-native-network-info";
import axios from 'axios';


interface TextWithPlayProps {
    text: string;
    textSize?: number;
    btnSize?: number;
    textColor?: string;
    btnColor?: string;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    btnStyle?: ViewStyle;
    disableBtn?: boolean;
    children?: React.ReactNode;
    toBackend?: boolean;
}

const TextWithPlay = ({text, textColor, textSize, textStyle, btnColor, btnSize, btnStyle, containerStyle, disableBtn = false, toBackend = false, children}: TextWithPlayProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [localIp, setLocalIp] = useState<String | null>("192.168.0.159");
  const [connected, setConnected] = useState(false)

  useEffect(()=> {
    // console.log("Fetching IP...")
    // NetworkInfo.getIPV4Address().then(ip => {
    //   console.log("IP: ", ip)
    //   setLocalIp(ip);
    // }).catch(error => {
    //   console.log("FF rror: ", error)

    // })
    
    // axios
    //   .get("https://api.ipify.org?format=json")
    //   .then((response) => {
    //     // console.log("IP: ", response.data.ip)
    //     setLocalIp(response.data.ip);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching IP:", error);
    //   });

    try{

      // if(localIp && !connected){
      //   console.log("going...")
      //   axios.get(`http://${localIp}:8002`)
      //   // axios.get(`http://127.0.0.1:8000`)
      //   .then((response) => {
      //     console.log("Backend Respone: ", response.data)
      //     setConnected(true);
      //   })
      //   .catch(error => {
      //     console.log("Error: ", error)
      //   })
      // }

    } catch(error){
      console.log(error)
    }
  }, [])

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, {color: textColor, fontSize: textSize}, textStyle]}>{text} {children && children}</Text>

      {
        !disableBtn && <PlayButton
          text={text}
          color={btnColor}
          size={btnSize}
          style={btnStyle}
          toBackend={toBackend}
        />
      }
    </View>
  )
}

export default TextWithPlay

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },

    text: {
        // flex: 1,
        // marginRight: 8
    }
})