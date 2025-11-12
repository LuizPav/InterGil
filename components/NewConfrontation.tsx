import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

type NewConfrontationProps = {
  closeModal: () => void;
};

export default function NewConfrontation({closeModal}: NewConfrontationProps) {

  const [home1, sethome1] = useState('');
  const [home2, sethome2] = useState('');
  const [hour, setHour] = useState('');

 return (
    <View className='flex-1 justify-center items-center'>
      <View className='h-128 w-[90%] bg-white justify-center items-center rounded-lg p-4'>
        <TextInput 
          className='w-[90%] h-12 border-gray-400 border-2 border-solid rounded-lg pl-4'
          value={home1}
          onChangeText={sethome1}
          placeholder='Insira a Primeira sala do Confronto'
        />
        <TextInput 
          className='w-[90%] h-12 border-gray-400 border-2 border-solid rounded-lg pl-4'
          value={home2}
          onChangeText={sethome2}
          placeholder='Insira a Segunda sala do Confronto'
        />
        <TextInput 
          className='w-[90%] h-12 border-gray-400 border-2 border-solid rounded-lg pl-4'
          value={hour}
          onChangeText={setHour}
          placeholder='Insira o horário do Confronto'
        />
        <TouchableOpacity onPress={closeModal} className='mt-4 p-2 bg-blue-500 rounded'>
          <Text className='text-white'>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}