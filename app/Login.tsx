import { Image, Text, View, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import LoginField from '@/components/LoginField';
import { auth } from '@/src/firebaseConnection';

export default function Index() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function handleLogin(){

    if(!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    const user = await signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      router.replace('/Home')
      // console.log(user);
    })
    .catch((err) => {
      console.log(err.code);
      if(err.code == 'auth/invalid-email') {
        alert('Email inválido!');
      } else if(err.code == 'auth/user-not-found') {
        alert('Usuário não encontrado!');
      } else if(err.code == 'auth/invalid-credential') {
        alert('Email ou Senha incorreto(s)!');
      } else {
        alert('Erro ao fazer login. Tente novamente mais tarde.');
      }
      return;
    })
      
  }


 return (
   <SafeAreaView className='flex-1 bg-base'>
    <ScrollView>
      <Image
        source={require('@/assets/images/intergilAppLogo.png')}
        className='w-[70%] h-[250px] mx-auto my-32'
      />
      <View className='flex-1'>
        <Text className='font-horizon text-4xl text-white ml-8 mb-24'>
          LOG IN
        </Text>
        <View>
          <LoginField type='default' placeholder='Email' icon='user-circle' onTextChange={setEmail} value={email}/>
          <LoginField type='default' placeholder='Senha' icon='lock' onTextChange={setPassword} value={password}/>
        </View>
        <View className='flex flex-row items-center ml-8 mt-10 mb-4'>
          <Text className='text-white mr-2 text-bold text-lg'>
            Não se cadastrou?
          </Text>
          <TouchableOpacity onPress={() => {router.push('/Register')}}>
            <Text className='text-link font-bold text-lg'>
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
        <View className='flex flex-row justify-end mr-12 mt-10'>
          <TouchableOpacity onPress={handleLogin}>
            <FontAwesome5 name="arrow-alt-circle-right" size={60} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
}