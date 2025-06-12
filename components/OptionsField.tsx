import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function OptionsField() {

const router = useRouter();

 return (
   <View className='flex-1 flex-row flex-wrap'>
      <Pressable 
      className='w-[200px] h-[300px] bg-white rounded-lg shadow-lg items-center grow ml-[40px] mr-[20px] mt-[20px] mb-[20px]'
      onPress={() => router.push('/Trophy/Modalidades')}
      >
        <Image 
          source={require('@/assets/images/TrophyIcons/Ball.png')}
          className='w-[80%] h-[70%]'
          resizeMode='contain'
        />
        <Text className='text-3xl pb-8 pt-0'>
          Modalidades
        </Text>
      </Pressable>

      <Pressable 
      className='w-[200px] h-[300px] bg-white rounded-lg shadow-lg items-center grow mr-[40px] mt-[20px] mb-[20px]'
      onPress={() => router.push('/Trophy/Confronto')}
      >
        <Image 
          source={require('@/assets/images/TrophyIcons/VS.png')}
          className='w-[85%] h-[70%]'
          resizeMode='contain'
        />
        <Text className='text-3xl pb-8 pt-0'>
          Confrontos
        </Text>
      </Pressable>

      <Pressable 
      className='w-[200px] h-[300px] bg-white rounded-lg shadow-lg items-center grow ml-[30px] mt-[20px] mb-[20px]'
      onPress={() => router.push('/Trophy/Placar')}
      >
        <Image 
          source={require('@/assets/images/TrophyIcons/Scoreboard.png')}
          className='w-[90%] h-[70%]'
          resizeMode='contain'
        />
        <Text className='text-3xl pb-8 pt-0'>
          Placar
        </Text>
      </Pressable>

      <Pressable 
      className='w-[200px] h-[300px] bg-white rounded-lg shadow-lg items-center grow mr-[30px] ml-[20px] mt-[20px] mb-[20px]'
      onPress={() => router.push('/Trophy/Casas')}
      >
        <Image 
          source={require('@/assets/images/TrophyIcons/Trophy.png')}
          className='w-[85%] h-[70%]'
          resizeMode='contain'
        />
        <Text className='text-3xl pb-8 pt-0'>
          Casas
        </Text>
      </Pressable>
   </View>
  );
}