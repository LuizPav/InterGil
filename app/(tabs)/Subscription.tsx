import { Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SubscriptionField from '@/components/SubscriptionField';
import SubscriptionPicker from '@/components/SubscriptionPicker';
import { useState } from 'react';

export default function Tela3() {

  const [studentName, setStudentName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [sala, setSala] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentNumber, setParentNumber] = useState('');
  const [CPF, setCPF] = useState('');

  const clearFields = () => {
    setStudentName('');
    setStudentNumber('');
    setModalidade('');
    setSala('');
    setParentName('');
    setParentNumber('');
    setCPF('CPF');
    console.log('Fields cleared');
  };

 return (
    <SafeAreaView className='flex-1'>
      <ImageBackground
        source={require('@/assets/images/Backgrounds/inscriptionBackground.png')}
        className='flex-1 w-full h-full'
      >
        <View className='flex-row items-end pl-4 h-[270px]'>
          <Image
            source={require('@/assets/images/intergilLogo.png')}
            className='h-[200px] w-[180px] object-contain'
          />
          <Text className='font-horizon text-3xl text-white mb-8'>
            Inscrição
          </Text>
        </View>

        <View className='bg-white h-[750px] w-[90%] rounded-lg mx-auto'>
          <View className='flex-1 items-center'> 
            <SubscriptionField label="Nome Completo" value={studentName} 
              onChangeText={setStudentName} 
            />
            <SubscriptionField label="Telefone (Aluno)" value={studentNumber} 
              onChangeText={setStudentNumber} type='phone-pad'
            />
  
            <SubscriptionPicker label="Modalidades" selectedValue={modalidade} 
              onValueChange={setModalidade}
            />
            <SubscriptionPicker label="Sala" selectedValue={sala} 
              onValueChange={setSala}
            />
  
            <SubscriptionField label="Nome Completo (Responsável)" value={parentName} 
              onChangeText={setParentName} 
            />
            <SubscriptionField label="Telefone (Responsável)" value={parentNumber} 
              onChangeText={setParentNumber} type='phone-pad'
            />
            <SubscriptionField label="CPF" value={CPF} 
              onChangeText={setCPF} type='numeric'
            />
  
            <TouchableOpacity 
              className='bg-[#072042] rounded-full w-[120px] h-[50px] absolute bottom-24 right-8 justify-center items-center'
              onPress={() => clearFields()}
            >
              <Text className='text-white font-bold text-lg'>
                Enviar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
    </SafeAreaView>
);
}