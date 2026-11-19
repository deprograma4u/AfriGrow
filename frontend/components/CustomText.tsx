
import { useMemo } from "react";
import { View, Text, useColorScheme } from "react-native";

const CustomText = ({
  text,
  color = "",
  size,
  style = {},
}: {
  text: string | undefined;
  color?: string;
  size: number;
  style?: any;
}) => {

  return (
    <Text
      style={[
        {
          color: color,
          fontSize: size,
          flexWrap: "wrap",
          // numberOfLines: 1,
          // ellipsizeMode={"tail"},
          maxWidth: '100%',
          // textAlign: 'center'
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
};

export default CustomText;
