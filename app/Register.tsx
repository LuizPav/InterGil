import { Image, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import LoginField from '@/components/LoginField';
import { Picker } from '@react-native-picker/picker';

type PickerItem = {
  label: string;
  value: string;
  enabled?: boolean;
};

export default function Register() {

  const router = useRouter();

  const handleRegister = () => {
    router.replace('/Login')
  }

  const seriesOptions: PickerItem[] = [
    { label: 'Série', value: '', enabled: false },
    { label: '1ADS', value: '1ADS'},
    { label: '1BDS', value: '1BDS'},
    { label: '1AADM', value: '1AADM'},
    { label: '1BADM', value: '1BADM'},
    { label: '2ADS', value: '2ADS'},
    { label: '2BDS', value: '2BDS'},
    { label: '2AADM', value: '2AADM'},
    { label: '2BADM', value: '2BADM'},
    { label: '3ADS', value: '3ADS'},
    { label: '3BDS', value: '3BDS'},
    { label: '3AADM', value: '3AADM'},
    { label: '3BADM', value: '3BADM'},
  ] 

 return (
   <SafeAreaView className='flex-1 bg-[#081736]'>
    <Image 
      source={require('@/assets/images/LoginLogo.png')}
      className='w-[70%] h-[150px] mx-auto my-32'
    />

    <View className='flex-1'>
      <Text className='font-horizon text-4xl text-white ml-8 mb-24'>
        Cadastro
      </Text>

      <View>
        <LoginField type='default' placeholder='Nome Completo'/>
        <LoginField type='default' placeholder='Matrícula'/>
        <View className='w-[90%] h-[50px] bg-white rounded-lg mx-auto my-2'>
          <Picker style={{ 
            width: '98%', height: 48, backgroundColor: 'white', 
            color: '#081736', marginHorizontal: 'auto', fontWeight: 'bold'
            }}
            dropdownIconColor={'#000'}
            >
           {seriesOptions.map((item) => (
            <Picker.Item 
              key={item.value} 
              label={item.label} 
              value={item.value} 
              enabled={item.enabled ?? true}
              color={item.label === 'Série' ? '#0000' : '#000'}
            />
           ))}
          </Picker>
        </View>
        <LoginField type='default' placeholder='Senha'/>
        <LoginField type='default' placeholder='Confirme a Senha'/>
      </View>

      <View className='flex flex-row justify-start ml-8 mt-10'>
        <TouchableOpacity onPress={handleRegister}>
          <FontAwesome5 name="arrow-alt-circle-left" size={60} color="white" />
        </TouchableOpacity>
      </View>

    </View>
   </SafeAreaView>
  );
}