import { ImageBackground, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { db } from '@/src/firebaseConnection';
import { doc, getDoc } from 'firebase/firestore';

import ProfileField from '@/components/ProfileField';
import ModalidadesField from '@/components/ModalidadesField';

type UserData = {
  name: string;
  matricula: string;
  password: string;
  admin: boolean;
  house: string;
}

export default function Profile() {

  const [userData, setUserData] = useState<Partial<UserData>>({});

  useEffect(() => {
    async function fetchUserData() {
      const docref = doc(db, 'Users', '696969');
      getDoc(docref)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as UserData;
          setUserData(data);
          console.log('informações do usuário: ', snapshot.data());
        } else {
          console.log('Não há dados para este usuário.');
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar dados do usuário: ', err);
      })
    }  
    fetchUserData();
  }, []);


  const router = useRouter();

  const handleLogout = () => {
    router.replace('/Login');
  }

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

      <ProfileField name={userData.name || "..."} matricula={userData.matricula} house={userData.house}/>

      <ModalidadesField />
      
      <View className='flex-column items-center justify-center my-8'>
        <TouchableOpacity className='items-start justify-start' onPress={handleLogout}>
          <MaterialIcons name='logout' color={'white'} size={25} className='pb-4'/>
        </TouchableOpacity>
        <View className='mx-auto w-[90%] bg-[#9299ce] h-[2px]' />
      </View>
    </ImageBackground>
   </SafeAreaView>
  );
}