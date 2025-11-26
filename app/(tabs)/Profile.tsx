import { useState, useEffect } from 'react';
import { ImageBackground, Text, View, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

import { auth, db } from '@/src/firebaseConnection';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth'

import ProfileField from '@/components/ProfileField';
import ModalidadesField from '@/components/ModalidadesField';
import { useAuthUser } from '@/hooks/useAuthUser';

import { UserData } from '@/src/types';

export default function Profile() {

const [userData, setUserData] = useState<Partial<UserData>>({});

 const { user, isLoading } = useAuthUser();

  useEffect(() => {
    async function fetchUserData() {

      if(!user) {
        return;
      }

      const docref = doc(db, 'Users', user.uid);
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
    if(user){
      fetchUserData();
    }
  }, [user?.uid]);


  const router = useRouter();

  async function handleLogout() {
    await signOut(auth)
    router.replace('/Login');
    console.log('Usuário deslogado com sucesso!');
  }

  if(isLoading) {
    return (
      <SafeAreaView className='flex-1 items-center justify-center bg-[#081736]'>
        <ActivityIndicator size='large' color='#fff' />
        <Text className='text-white'>Carregando...</Text>
      </SafeAreaView>
    );
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

      <ModalidadesField/>
      
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