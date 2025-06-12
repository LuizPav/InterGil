import { View, Text, Image } from 'react-native';

export default function ConfrontationField() {
 return (
   <View className='flex-1 w-[90%] m-auto mt-16 rounded-xl items-center justify-center bg-[#FFFC]'>
      <View className='w-[85%] h-[200px] flex-row'>
        <View className='flex-1 items-center justify-center'>
          <Image
            source={require('@/assets/images/HomeIcons/Infernais.jpg')}
            className='w-[100px] h-[100px] mx-auto my-4 rounded-full'
            resizeMode='contain'
          />
          <Text className='text-center text-2xl font-bold'>
            Infernais
          </Text>
        </View>

        <View className='flex-1 items-center justify-center'>
          <Text className='text-black text-2xl font-bold mt-16'>
            0       |        0
          </Text>
          <View className='w-[80px] h-[40px] items-center justify-center bg-[#092a56] m-auto rounded-full'>
            <Text className='font-bold text-white text-xl'>
              11:00
            </Text>
          </View>
        </View>

        <View className='flex-1 items-center justify-center'>
          <Image
            source={require('@/assets/images/HomeIcons/Comando.jpg')}
            className='w-[100px] h-[100px] mx-auto my-4 rounded-full'
            resizeMode='contain'
          />
          <Text className='text-center text-2xl font-bold'>
            Comando
          </Text>
        </View>
      </View>
   </View>
  );
}