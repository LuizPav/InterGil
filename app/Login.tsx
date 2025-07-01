import { Image, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import LoginField from '@/components/LoginField';

export default function Index() {

  const router = useRouter();

  const handleLogin = () => {
    router.replace('/Home')
  }

 return (
   <SafeAreaView className='flex-1 bg-[#081736]'>
    <Image 
      source={require('@/assets/images/LoginLogo.png')}
      className='w-[70%] h-[150px] mx-auto my-32'
    />

    <View className='flex-1'>
      <Text className='font-horizon text-4xl text-white ml-8 mb-24'>
        LOG IN
      </Text>

      <View>
        <LoginField type='default' placeholder='Nome' icon='user-circle'/>
        <LoginField type='default' placeholder='Matrícula' icon='id-card'/>
        <LoginField type='default' placeholder='Senha' icon='lock'/>
      </View>

      <View className='flex flex-row items-center ml-8 mt-10 mb-4'>
        <Text className='text-white mr-2 text-bold text-lg'>
          Não se cadastrou?
        </Text>
        <TouchableOpacity onPress={() => {router.push('/Register')}}>
          <Text className='text-[#5271FF] font-bold text-lg'>
            Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>

      <View className='flex flex-row justify-end mr-12 mt-10'>
        <TouchableOpacity onPress={handleLogin}>
          <FontAwesome5 name="arrow-alt-circle-right" size={60} color="white" />
        </TouchableOpacity>
      </View>

    </View>
   </SafeAreaView>
  );
}