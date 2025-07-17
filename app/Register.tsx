import { Image, ScrollView, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

import { db } from '@/src/firebaseConnection';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '@/src/firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth'

import LoginField from '@/components/LoginField';

type PickerItem = {
  label: string;
  value: string;
  enabled?: boolean;
};

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [house, setHouse] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const router = useRouter();

  async function handleRegister() {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const uid = user.user.uid;
      console.log(user)

      const userDocRef = doc(db, 'Users', uid);

        await setDoc(userDocRef, {
        name: name,
        email: email,
        matricula: matricula,
        house: house,
        password: password,
        admin: false,
        })


        alert('Cadastro realizado com sucesso!');
        router.replace('/Login');

      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        alert('Erro ao criar usuário. Tente novamente mais tarde.');
      }
    
    if(!name || !matricula || !house || !password || !confirmPassword) {
      alert('Preencha todos os campos!');
      return;
    }

    if(password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if(email === '' || !email.includes('@')) {
      alert('Insira um email válido!');
      return;
    }
  }

  const seriesOptions: PickerItem[] = [
    { label: 'Série', value: '', enabled: false },
    { label: '1 ADS', value: '1 ADS'},
    { label: '1 BDS', value: '1 BDS'},
    { label: '1 AADM', value: '1 AADM'},
    { label: '1 BADM', value: '1 BADM'},
    { label: '2 ADS', value: '2 ADS'},
    { label: '2 BDS', value: '2 BDS'},
    { label: '2 AADM', value: '2 AADM'},
    { label: '2 BADM', value: '2 BADM'},
    { label: '3 ADS', value: '3 ADS'},
    { label: '3 BDS', value: '3 BDS'},
    { label: '3 AADM', value: '3 AADM'},
    { label: '3 BADM', value: '3 BADM'},
  ] 

 return (
   <SafeAreaView className='flex-1 bg-base'>
    <ScrollView>
      <View className='flex flex-row justify-start ml-8 mt-10'>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-alt-circle-left" size={50} color="white" />
        </TouchableOpacity>
      </View>
      <Image
        source={require('@/assets/images/intergilAppLogo.png')}
        className='w-[70%] h-[250px] mx-auto mb-16'
      />
      <View className='flex-1'>
        <Text className='font-horizon text-4xl text-white ml-8 mb-24'>
          Cadastro
        </Text>
        <View>
          <LoginField type='default' placeholder='Nome Completo'
                      onTextChange={setName} value={name}
          />
          <LoginField type='email-address' placeholder='Email'
                      onTextChange={setEmail} value={email}
          />
          <LoginField type='default' placeholder='Matrícula'
                      onTextChange={setMatricula} value={matricula}
          />
          <View className='w-[90%] h-[50px] bg-white rounded-lg mx-auto my-2'>
            <Picker style={{
              width: '98%', height: 48, backgroundColor: 'white',
              color: '#081736', marginHorizontal: 'auto', fontWeight: 'bold'
              }}
              dropdownIconColor={'#000'}
              selectedValue={house}
              onValueChange={(itemValue) => setHouse(itemValue as string)}
              >
             {seriesOptions.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
                enabled={item.enabled ?? true}
                color={item.label === 'Série' ? '#0000' : '#000'}
              />
             ))}
            </Picker>
          </View>
          <LoginField type='default' placeholder='Senha'
                      onTextChange={setPassword} value={password}
                      secureTextEntry={true}
          />
          <LoginField type='default' placeholder='Confirme a Senha'
                      onTextChange={setConfirmPassword} value={confirmPassword}
                      secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress={handleRegister}
        style={{
          backgroundColor: '#5271FF',
          width: '40%',
          height: 50,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          alignSelf: 'center'
        }}
        className='flex-1 bg-[#5271FF] w-[40%] h-[50px] rounded-lg items-center justify-center mx-auto'>
          <Text className='text-white font-bold text-lg font-clearSans'>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
}