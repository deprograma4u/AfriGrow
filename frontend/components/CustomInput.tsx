import { useState } from 'react';
import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

const CustomInput = ({
  placeholder = "placeholder",
  value,
  name,
  color="black",
  error,
  disabled = false,
  type = "text",
  prefix,
  postFix,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  name?: string;
  color?: string;
  disabled?: boolean;
  error?: string;
  type?: "text" | "email" | "number" | "password";
  prefix?: string;
  postFix?: React.ReactNode;
  onChange?: ((text: string) => void) | undefined;
}) => {

  return (
    <View>
      <Text style={{color: color}}>{name}</Text>
      <TextInput 
        value={value}
        placeholder={placeholder || 'Enter ' + name}
        onChangeText={onChange}
        placeholderTextColor={"gray"}
        style={{borderWidth: 1, borderColor: 'gray', padding: 10,paddingHorizontal: 10}}
      />
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  )
}

export default CustomInput