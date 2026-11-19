

import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { View, Text } from 'react-native'
// import PickerItem from './PickerItem'
const PickerComp = ({
    selectedValue,
    onValueChange,
    items,
    color,
    initial='Select',
    error,
    style,
}:{
    selectedValue: string,
    initial?: string ,
    error?: string ,
    color?: string ,
    onValueChange: (itemValue: string) => void,
    items: { label: string, value: string, id: string | number }[]
    style?: any
}) => {
    // const [selectedValue, setSelectedValue] = useState('filter')
    const [tintColor, setTintColor] = useState<string | undefined>('gray')

    // initial === 'Select City' && console.log('items', items)
    
  return (
    <View style={{ marginTop: 20}}>
        {initial && <Text style={{ color: color, marginBottom: 10 }}>{initial}</Text>}
        <View style={{width: '100%', borderWidth: 1, borderColor: tintColor, }}>
            <Picker
                selectedValue={selectedValue}
                mode="dropdown"
                style={[{ width: '100%', color: color }, style]}
                onValueChange={onValueChange}
                selectionColor={color}
                onFocus={() => setTintColor(color)}
                onBlur={() => setTintColor('gray')}
                dropdownIconColor={tintColor}
            >
                { initial && <Picker.Item style={{color: color}} key={999} label={"Select " + initial} value={''}  />}
                {items.map(ite => (
                    <Picker.Item  style={{color: color}} key={ite.id} label={ite.label} value={ite.value}  />
                ))}
            </Picker>
        </View>
        {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  )
}

export default PickerComp