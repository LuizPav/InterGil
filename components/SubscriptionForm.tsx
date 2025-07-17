import { View, TouchableOpacity, Text } from 'react-native';

import SubscriptionField from '@/components/SubscriptionField';
import SubscriptionPicker from '@/components/SubscriptionPicker';

type SubscriptionFormProps = {
  studentName: string;
  setStudentName: (text: string) => void;
  studentNumber: string;
  setStudentNumber: (text: string) => void;
  modalidade: string;
  setModalidade: (value: string) => void;
  sala: string;
  setSala: (value: string) => void;
  parentName: string;
  setParentName: (text: string) => void;
  parentNumber: string;
  setParentNumber: (text: string) => void;
  CPF: string;
  setCPF: (text: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export default function SubscriptionForm({ 
  studentName, setStudentName, 
  studentNumber, setStudentNumber,
  modalidade, setModalidade,
  sala, setSala,
  parentName, setParentName,
  parentNumber, setParentNumber,
  CPF, setCPF, 
  onSubmit, isSubmitting
  }: SubscriptionFormProps) {

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
  
            {isSubmitting ?
              <TouchableOpacity 
              className='bg-[#a2a2a2] rounded-full w-[120px] h-[50px] absolute bottom-24 right-8 justify-center items-center'
              onPress={onSubmit}
              disabled={isSubmitting}
              >
                <Text className='text-white font-bold text-lg'>
                  Enviando...
                </Text>
              </TouchableOpacity>
              :
              <TouchableOpacity 
                className='bg-[#072042] rounded-full w-[120px] h-[50px] absolute bottom-24 right-8 justify-center items-center'
                onPress={onSubmit}
                disabled={isSubmitting}
              >
                <Text className='text-white font-bold text-lg'>
                  Enviar
                </Text>
              </TouchableOpacity>
            }   
    </View>
  );
}