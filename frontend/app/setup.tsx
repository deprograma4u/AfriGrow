import CustomeButton from '@/components/CustomeButton'
import CustomInput from '@/components/CustomInput'
import PickerComp from '@/components/PickerComp'
import { useTheme } from '@/components/ThemeProvider'
// import { Colors } from '@/constants/Colors'
import { validateFormData, validateFormDataType } from '@/constants/formValidate'
import { ghanaData } from '@/constants/ghanaData'
import { styles } from '@/constants/styles'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/app-store'
import { LanguageType } from '@/store/language-store'
// import { database } from '@/database/connection'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native'


const setup = () => {
  // const db = new database();
  const Colors = useTheme()
  const {setUserProfile} = useAppStore();
  const {setLanguage} = useTranslation()
  const navigator = useRouter();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<validateFormDataType>({
    name: '',
    country: '',
    region: '',
    city: '',
    experience: '',
    farmSize: '',
    language: '',
    mainCrops: '',
  })

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    region: '',
    city: '',
    experience: '',
    farmSize: '',
    language: '' as LanguageType,
    mainCrops: '',
  })

  const languages = [
    {
      id: 2,
      label: 'Twi',
      value: 'tw'
    },
    {
      id: 1,
      label: 'English',
      value: 'en'
    },
    // {
    //   id: 3,
    //   label: 'Dagbani',
    //   value: 'dg'
    // }
  ]

  const countries = [
    {
      id: 1,
      label: 'Ghana',
      value: 'ghana'
    }
  ]
  
  const onChangeText = (key: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const saveSetup = async () => {
    try{

      setLoading(true);
      const errors = validateFormData(formData);
      const allValuesEmpty = Object.values(errors).every(value => value.trim() === '');

      setError(errors);
  
      if(allValuesEmpty){
        setUserProfile({location: `${formData.country},${formData.region},${formData.city}`, name: formData.name, isLoggedIn: true});
        setLanguage(formData.language)
        
        navigator.replace("/(tabs)/" as never);

      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    
  }, []);

  return (
    <View style={[styles.container, styles.container, {padding: 10, backgroundColor: "white"}]}>
      <KeyboardAvoidingView>
        <ScrollView
          keyboardDismissMode="on-drag"
        >
          <View style={[
            {height: 100, marginTop: 50},
            styles.justifyCenter
          ]}>
            <Text style={{color: Colors.primary, fontSize: 30}}>Hi</Text>
            <Text style={{color: Colors.textLight}}>
              Please provide the following
              details to continue
            </Text>
          </View>

          {/* Form */}
          <View>
            <CustomInput 
              name='Name' 
              color={"black"}
              placeholder='Your Name'
              value={formData.name}
              error={error.name}
              // placeholder=''
              onChange={(text) => onChangeText('name', text)}
            />

            <PickerComp
              selectedValue={formData.country}
              color={"black"}
              initial={'Country'}
              onValueChange={(itemValue) => {
                onChangeText('country', itemValue);
                // onChangeText('city', ''); // Reset city when state changes
              }}
              items={countries}
              error={error.country}
              // style={[styles.mt2, styles.w100]}
            />

            <PickerComp
              selectedValue={formData.region}
              color={"black"}
              initial={'Region'}
              onValueChange={(itemValue) => {
                onChangeText('region', itemValue);
                // onChangeText('city', ''); // Reset city when state changes
              }}
              error={error.region}
              items={Object.keys(ghanaData).map((region: any) => ({
                id: region,
                label: region,
                value: region,
              }))}
              // style={[styles.mt2, styles.w100]}
            />

            <PickerComp
              selectedValue={formData.city}
              color={"black"}
              onValueChange={(itemValue) => onChangeText('city', itemValue)}
              initial={'City'}
              // items={(formData.state.length > 0) ? ghanaData[formData.state] : []}
              error={error.city}
              items={formData.region.length > 0 ? (ghanaData[formData.region as keyof typeof ghanaData] || []).map((city: any) => ({
                id: city.label,
                label: city.label,
                value: city.label,
              })): []}
              // style={[styles.mt2, styles.w100]}
            />

            <PickerComp
              selectedValue={formData.language}
              color={"black"}
              onValueChange={(itemValue) => onChangeText('language', itemValue)}
              initial={'Prefered Language'}
              error={error.language}
              items={languages}
            />            
          </View>

          <View style={[styles.mt3]}>
            <Text style={{color: Colors.primary, fontSize: 20}}>Note:</Text>
            <Text>These details will be used to personalize your experience</Text>
          </View>

          <View
            style={[
              styles.justifyCenter,
              styles.alignCenter,
              // {
              //   marginBottom: 30
              // }
            ]}
          >
            <CustomeButton
              title="Save Setup"
              loading={loading}
              onPress={() => saveSetup()}
              borderColor={Colors.primary}
              color="white"
              textColor={Colors.primary}
              style={{marginTop: 20, height: 50, width: '100%'}}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default setup