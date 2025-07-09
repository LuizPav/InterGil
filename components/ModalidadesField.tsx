import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'expo-router';

import Modalidade from './Modalidade';
import { db } from '@/src/firebaseConnection';
import { useAuthUser } from '@/hooks/useAuthUser';

export default function ModalidadesField() {

  const router = useRouter();
  const { user } = useAuthUser();
  const [haveModalidade, setHaveModalidade] = useState(false);

  useEffect(() => {
    async function fetchHaveModaldiades() {
      try{
        if(!user){
          return
        }
        const userSubRef = collection(db, 'Users', user.uid, 'ModalidadesInscritas')
        const userSubSnapshot = await onSnapshot(userSubRef, (querySnapshot) => {
          // console.log(userSubSnapshot.empty)
          if(querySnapshot.empty){
            setHaveModalidade(false);
          } else {
            setHaveModalidade(true);
          }

        });
      } catch(err) {
        console.log(err)
      }
    }
    fetchHaveModaldiades();
  }, [user?.uid])

 return (
   <View>
      {haveModalidade ? 
        <View className='flex-column items-center pl-4 mx-auto w-[85%] h-[150px] bg-[#092a56] rounded-2xl'>
          <View className='flex-row flex-1 text-center'>
            <Modalidade option='Modalidades' itemOption='name'/>
            <Modalidade option='Horário' itemOption='Horario'/>
            <Modalidade option='Lugar' itemOption='Lugar'/>
            <Modalidade option='Data' itemOption='Data'/>  
          </View>
        </View>
      :
        <View className='flex-column items-center pl-4 mx-auto w-[85%] h-[150px] bg-[#092a56] rounded-2xl'>
          <View className='flex-row flex-1 text-center items-center'>
            <Text className='text-2xl text-white font-clearSans pr-1'>
              Se inscreva nas modalidades na aba
            </Text>
            <Pressable onPress={() => router.push('/Subscription')}>
              <Text className='text-2xl text-[#52a1FF] font-clearSans'>
                Inscrição
              </Text>
            </Pressable>
          </View>
        </View>
      }
   </View>
  );
}