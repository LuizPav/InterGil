import { View, Text, TouchableOpacity, ImageBackground, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type EditalExpandedProps = {
  closeModal: () => void;
  isAdmin?: boolean | null;
};

export default function EditalExpanded( {closeModal, isAdmin } :EditalExpandedProps ){

  const setEdital = () => {
    console.log('Edital set');
  };

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
          <View className='flex-1 h-[10%] w-full justify-center items-end pr-6 pt-6'>
            {isAdmin && 
              <Pressable onPress={setEdital}>
                <AntDesign name='edit' size={40} color={'#000'} className='flex-1'/>
              </Pressable>
            }
          </View>
        </View>
      </View>
    </View>
  </ImageBackground>
  );
}