import { Text, View, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SubscriptionForm from '@/components/SubscriptionForm';

export default function Subscription() {

 return (
    <SafeAreaView className='flex-1'>
      <ImageBackground
        source={require('@/assets/images/Backgrounds/inscriptionBackground.png')}
        className='flex-1 w-full h-full'
      >
        <View className='flex-row items-end pl-4 h-[270px]'>
          <Image
            source={require('@/assets/images/intergilLogo.png')}
            className='h-[200px] w-[180px] object-contain'
          />
          <Text className='font-horizon text-3xl text-white mb-8'>
            Inscrição
          </Text>
        </View>

        <View className='bg-white h-[750px] w-[90%] rounded-lg mx-auto'>
           <SubscriptionForm />
        </View>

      </ImageBackground>
    </SafeAreaView>
);
}