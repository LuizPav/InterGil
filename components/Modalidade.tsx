import { View, Text } from 'react-native';

type ModalidadeProps = {
  option: string;
  itemOption: 'name' | 'Horario' | 'Lugar' | 'Data';
};

export default function Modalidade({option, itemOption}: ModalidadeProps) {

  const modalidades = [
    { name: 'Free Fire', Horario: '10:00', Lugar: 'Auditório', Data: '01/01/2025'},
    { name: 'Vôlei', Horario: '13:00', Lugar: 'Quadra', Data: '03/01/2025'},
    { name: 'LOL', Horario: '09:00', Lugar: 'Sala 8', Data: '02/01/2025'},
  ]

 return (
   <View className='items-center justify-center'>
      {/* Cabeçalho */}
      <Text className='px-8 border-r-2 text-xl text-center border-white text-white'>{option}</Text>
      {/* Item */}
      {modalidades.map( (item, index) => (
        <View key={index} className='px-8'>
          <Text className='text-white text-center py-2 text-xl font-bold'>{item[itemOption]}</Text>
          <View className='bg-white w-full h-[2px]'/>
        </View>
      ))}
    </View>
  );
}