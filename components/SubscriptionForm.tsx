import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import SubscriptionField from '@/components/SubscriptionField';
import SubscriptionPicker from '@/components/SubscriptionPicker';

export default function SubscriptionForm() {

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
  );
}