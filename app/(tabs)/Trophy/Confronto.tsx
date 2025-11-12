import { View, Text, ImageBackground, ActivityIndicator, Modal, FlatList } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAdminUser } from '@/hooks/useAdminUser';

import ConfrontationField from '@/components/ConfrotationField';
import NewConfrontation from '@/components/NewConfrontation';

export default function Confronto() {
  
  const router = useRouter();

  const { adminUser, isLoading } = useAdminUser();
  const [editModalVisible, setEditModalVisible] = useState(false);

  if( isLoading ) {
    return (
      <View className='flex-1 items-center justify-center bg-base'>
        <ActivityIndicator color='#f8a000' size='large' />
        <Text className='text-center text-lg text-white font-clearSans mt-4'>
          Carregando...
        </Text>
      </View>
    )
  }

  const openEditModal = () => {
    setEditModalVisible(true);
    console.log(editModalVisible);
  }

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

          { adminUser &&
            <TouchableOpacity onPress={(openEditModal)}>
              <AntDesign name='edit' size={24} color={'white'}/>
            </TouchableOpacity>
          }

        </View>

        <Modal visible={editModalVisible} animationType='slide' transparent={true}>
          <NewConfrontation closeModal={() => setEditModalVisible(false)}/>
        </Modal>
      </ImageBackground>
  </SafeAreaView>
  );
}