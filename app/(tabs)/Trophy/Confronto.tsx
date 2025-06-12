import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import ConfrontationField from '@/components/ConfrotationField';

export default function Confronto() {
  
  const router = useRouter();

 return (
  <SafeAreaView className='flex-1'>
      <ImageBackground
        source={require('@/assets/images/Backgrounds/confrontosBackground.png')}
        className='flex-1'
      >
        <View className='flex-row items-center pt-[20px] pl-[20px]'>
          <TouchableOpacity
            onPress={() => { router.back()}}
          >
            <AntDesign name='arrowleft' size={24} color={'white'} />
          </TouchableOpacity>
          <Text className='w-[88%] text-3xl text-white text-center font-horizon'>
            Confrontos
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <ConfrontationField />
          <ConfrontationField />
          <ConfrontationField />
          <ConfrontationField />
          <ConfrontationField />
          <ConfrontationField />
        </ScrollView>
      </ImageBackground>
  </SafeAreaView>
  );
}