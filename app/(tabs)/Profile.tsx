import { ImageBackground, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


import ProfileField from '@/components/ProfileField';
import ModalidadesField from '@/components/ModalidadesField';

export default function Profile() {
 return (
   <SafeAreaView className='flex-1'>
    <ImageBackground 
      source={require('@/assets/images/Backgrounds/ProfileBackground.png')}
      className='flex-1 w-full h-full'
    >
      <View className='items-center justify-center h-[270px]'>
        <Image 
          source={require('@/assets/images/intergilLogo.png')}
          className='w-[150px] h-[150px] mb-4'
          resizeMode='cover'
        />
        <Text className='font-horizon text-3xl text-white mb-8'>
          Perfil
        </Text>
      </View>

      <ProfileField />

      <ModalidadesField />
      
      <View className='flex-column items-center justify-center my-8'>
        <TouchableOpacity className='items-start justify-start'>
          <MaterialIcons name='logout' color={'white'} size={25} className='pb-4'/>
        </TouchableOpacity>
        <View className='mx-auto w-[90%] bg-[#9299ce] h-[2px]' />
      </View>
    </ImageBackground>
   </SafeAreaView>
  );
}