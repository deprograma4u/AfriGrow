import {
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { styles } from "@/constants/styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { useTheme } from "@/components/ThemeProvider";
// import { Pagination } from 'react-native-snap-carousel';

const Welcome = () => {
  //   const [index, setIndex] = useState(0)
  const Colors = useTheme();
  const { width, height } = Dimensions.get("window");
  const navigator = useNavigation();

  // const data = [...new Array(6).keys()];
  const [activeIndex, setActiveIndex] = useState(0); // State to keep track of the active slide

  const ref = useRef<ICarouselInstance>(null);

  const images = [
    require("../assets/slides/1.png"),
    require("../assets/slides/2.png"),
    require("../assets/slides/3.png"),
  ];

  const carousel = useCallback(
    () => (
      <Carousel
        ref={ref}
        width={width}
        autoPlay={true}
        height={height * 0.65}
        data={images}
        style={{
          backgroundColor: "white",
          width: "100%",
          padding: 10,
          borderRadius: 10,
          margin: 0,
        }}
        renderItem={({ item, index }: { item: any; index: any }) => (
          <View
            key={index}
            style={{
              flex: 1,
              backgroundColor: "#fff",
            }}
          >
            <Image
              source={item}
              style={{
                // width,
                // backgroundColor: 'red',
                width: "90%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
            <Text>Hey</Text>
          </View>
        )}
      />
    ),
    [width, height, ref, images]
  );

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <View style={[{ width: "100%", height: "20%", marginTop: 50 }]}>
        <Text
          style={{
            color: Colors.primary,
            bottom: -20,
            left: 25,
          }}
        >
          Welcome to
        </Text>

        <View style={[styles.flexRow, styles.justifyCenter]}>
          <Text style={[{ color: Colors.primary, fontSize: 80 }]}>A f r i</Text>
          <Text
            style={[
              {
                color: "black",
                fontSize: 80,
              },
            ]}
          >
            G r o w
          </Text>
        </View>
        <Text
          style={[
            { color: Colors.primary, fontSize: 12, top: -15, left: "65%" },
            // styles.positionAbsolute
          ]}
        >
          the farmers friend
        </Text>
      </View>

      {carousel()}

      <View style={[styles.justifyCenter, styles.alignCenter]}>
        <TouchableOpacity
          style={[
            {
              backgroundColor: Colors.primary,
              // padding: 10,
              height: 50,
              width: "80%",
              borderRadius: 10,
            },
            styles.justifyCenter,
            styles.alignCenter,
          ]}
          onPress={() => navigator.navigate("setup" as never)}
        >
          <Text style={[{ color: "#fff" }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
