import { Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import OptionsField from '@/components/OptionsField';

export default function Trophy() {
 return (
    <SafeAreaView className='flex-1 bg-[#072042]'>
      <ImageBackground
        source={require('@/assets/images/Backgrounds/TrophyBackground.png')}
        className='flex-1 w-full h-full'
      >
        <Image 
          source={require('@/assets/images/intergilLogo.png')}
          className='w-[250px] h-[250px] object-contain m-auto mt-4 mb-4'
        />
        <OptionsField />
      </ImageBackground>
    </SafeAreaView>
  );
}