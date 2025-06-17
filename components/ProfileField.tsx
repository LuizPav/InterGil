import { View, Text, Image } from 'react-native';

export default function ProfileField() {
 return (
   <View className='flex-row items-center mb-8 pl-4 mx-auto w-[85%] h-[150px] bg-[#092a56] rounded-2xl'>
      <Image 
        source={require('@/assets/images/HomeIcons/Infernais.jpg')}
        className='w-[100px] h-[100px] rounded-full mb-4'
        resizeMode='cover'
      />
      <View className='flex-1 justify-center ml-4'>
        <Text className='text-white text-2xl font-bold pb-2'>Luiz Henrique Ferreira Pavão</Text>
        <Text className='text-white text-lg pb-2'>Matrícula: 69696969</Text>
        <Text className='text-white text-lg'>Casa: Infernais</Text>
      </View>
   </View>
  );
}