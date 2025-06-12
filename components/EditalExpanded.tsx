import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type EditalExpandedProps = {
  closeModal: () => void;
};

export default function EditalExpanded( {closeModal} :EditalExpandedProps ){
 return (
  <ImageBackground
    source={require('@/assets/images/Backgrounds/EditalExpandedBackground.png')}
    className='flex-1 w-full h-full'>
    <View className='flex-1'>
      <View className='flex-row items-center pt-[20px] pl-[20px]'>
        <TouchableOpacity onPress={ () => closeModal() }>
          <AntDesign name='arrowleft' size={24} color={'white'} />
        </TouchableOpacity>
        <Text className='w-[88%] text-3xl text-white text-center font-horizon'>
          Edital
        </Text>
      </View>
      <View className='flex-1 justify-center items-center'>
        <View className='h-[90%] w-[90%] justify-center items-center bg-white rounded-3xl'>
        </View>
      </View>
    </View>
  </ImageBackground>
  );
}