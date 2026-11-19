
import { styles } from '@/constants/styles';
import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

const CustomeButton = ({
    title,
    loading = false,
    textColor,
    borderColor,
    color,
    onPress,
    style
}:{
    title: string;
    loading?: boolean;
    textColor?: string;
    borderColor?: string;
    color?: string;
    onPress?: () => void;
    style: any;
}) => {
  return (
    <>
        {
            loading ? <View style={[
                {
                    borderWidth: 1,
                    borderColor: borderColor === 'primary' ? color : borderColor,
                    // height: 50,
                    // width: '80%',
                    borderRadius: 10
                },
                // styles.mt3,
                styles.justifyCenter,
                styles.alignCenter,
                style,
            ]}>
                <ActivityIndicator size="small" color={color} />
            </View> :
            <TouchableOpacity style={[
                {
                    backgroundColor: color,
                    // padding: 10,
                    // height: 50,
                    // width: '80%',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: borderColor
                },
                // styles.mt3,
                styles.justifyCenter,
                styles.alignCenter,
                style,
            ]}
            onPress={onPress}
            >
                <Text style={{color: textColor ? textColor : '#000000'}}>{title}</Text>
            </TouchableOpacity>
        }
    </>
  )
}

export default CustomeButton