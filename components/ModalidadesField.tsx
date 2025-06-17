import { View } from 'react-native';

import Modalidade from './Modalidade';

export default function ModalidadesField() {
 return (
   <View>
      <View className='flex-column items-center pl-4 mx-auto w-[85%] h-[150px] bg-[#092a56] rounded-2xl'>
        <View className='flex-row flex-1 justify-center'>
          <Modalidade option='Modalidades' itemOption='name'/>
          <Modalidade option='Horário' itemOption='Horario'/>
          <Modalidade option='Lugar' itemOption='Lugar'/>
          <Modalidade option='Data' itemOption='Data'/>  
        </View>
      </View>
   </View>
  );
}