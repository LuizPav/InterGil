import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

export default function index() {

  const router = useRouter();

 return (
   <SafeAreaView className='flex-1 bg-[#081736]'>
    <View className='flex-1 justify-center items-center'>
      <Image
        source={require('../assets/images/intergilAppLogo.png')}
        className='w-[80%] h-[250px]'
      />  
    </View>
    <View className='absolute bottom-16 right-8 w-full flex flex-row justify-end items-center mr-12 mb-10'>
        <TouchableOpacity onPress={() => {router.replace('/Login')}}>
          <FontAwesome5 name="arrow-alt-circle-right" size={60} color="white" />
        </TouchableOpacity>
      </View>
   </SafeAreaView>
  );
}