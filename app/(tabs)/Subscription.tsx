import { Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/src/firebaseConnection';

import SubscriptionForm from '@/components/SubscriptionForm';
import { useAuthUser } from '@/hooks/useAuthUser'
import { UserData } from '@/src/types';

type UserSerie = {
  house: string;
}

export default function Subscription() {

  const { user, isLoading: AuthLoading } = useAuthUser();

  const [studentName, setStudentName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [sala, setSala] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentNumber, setParentNumber] = useState('');
  const [CPF, setCPF] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  //para validação de submits
  const [timesSubmitted, setTimesSubmitted] = useState(0);
  const [userSerie, setUserSerie] = useState<string | null>('');
  const [subscriptionLimitReached, setSubscriptionLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const clearFields = () => {
    setStudentName('');
    setStudentNumber('');
    setModalidade('');
    setSala('');
    setParentName('');
    setParentNumber('');
    setCPF('');
    console.log('Fields cleared');
  };

  const getLimitBySerie = (serie: string | null): number => {
    if(serie === null) {
      return 3;
    }

    if(serie.includes('3')){
      return 4;
    } else {
      return 3;
    }
  }
  
  
  async function handleSubscription() {
    
    
    if(!user) {
      alert('Usuário não autenticado. Por favor, faça login.');
      return;
    }
    
    if(!modalidade || !studentName || !studentNumber || 
      !sala || !parentName || !parentNumber || !CPF) 
      {
        alert('Por favor, preencha todos os campos corretamente.'); 
        return;
      }
      
      let userSerie: string | null;
      try{
        const userDocRef = doc(db, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if(userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          userSerie = userData.house;
        } else {
          console.warn('Usuário não encontrado no Firestore.');
          userSerie = null;
        }

        const userLimit = getLimitBySerie(userSerie);
        const subscribedModalidadesRef = collection(db, 'Users', user.uid, 'ModalidadesInscritas');
        const subscribedSnapshot = await getDocs(subscribedModalidadesRef);
        const currentInscricoes = subscribedSnapshot.size;
        
        if (currentInscricoes >= userLimit) {
        alert(`Você já atingiu o limite de ${userLimit} inscrições para sua série (${userSerie || 'N/A'}).`);
        setSubscriptionLimitReached(true);
        return;
      }
      } catch (err) {
        console.error('Erro ao obter série do usuário:', err);
        return;
      }

      setIsSubmitting(true);
      
      try {
        const docRef = doc(db, 'Users', user.uid, 'ModalidadesInscritas', modalidade)
        const listDocRef = doc(db, 'Modalidades', modalidade, 'inscritos', studentName)
        
        setDoc(docRef, {
        studentName: studentName,
        studentNumber: studentNumber,
        modalidade: modalidade,
        sala: sala,
        parentName: parentName,
        parentNumber: parentNumber,
        CPF: CPF,
        timeStamp: new Date()
      })  
      
      setDoc(listDocRef, {
        user: user.uid,
        studentName: studentName,
        sala: sala,
        studentNumber: studentNumber,
        parentName: parentName,
        parentNumber: parentNumber
      })
      
    } catch(err) {
      console.error('Erro ao salvar inscrição:', err);
      alert('Erro ao salvar inscrição. Tente novamente mais tarde.');
    } finally {
      setTimesSubmitted(prev => prev + 1);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const checkSubscriptionLimit = async () => {
      setIsLoading(true);
      if(!user){
        setUserSerie(null);
        setSubscriptionLimitReached(false);
        setIsLoading(false);
        return;
      }
      try {
        const userDocRef = doc(db, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        let serieFromDoc: string | null = null;

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          serieFromDoc = userData.house; // Pega o valor da série do documento
          setUserSerie(serieFromDoc); // Atualiza o estado da série para renderização
        } else {
          console.warn("Documento do usuário não encontrado para verificar a série. Usando série nula.");
        }

        const currentLimit = getLimitBySerie(serieFromDoc); // Calcula o limite com base na série
        const subscribedModalidadesRef = collection(db, 'Users', user.uid, 'ModalidadesInscritas');
        const subscribedSnapshot = await getDocs(subscribedModalidadesRef);
        const currentInscricoes = subscribedSnapshot.size;

        // Define se o limite foi atingido
        setSubscriptionLimitReached(currentInscricoes >= currentLimit);

        console.log(`Verificação de limite concluída:
          Série: ${serieFromDoc || 'N/A'}
          Inscrições atuais: ${currentInscricoes}
          Limite para série: ${currentLimit}
          Limite Atingido?: ${currentInscricoes >= currentLimit}`);
      } catch(err) {
        console.error('Erro ao verificar limite de inscrição:', err);
      } finally {
        setIsLoading(false);
      }
    }
    checkSubscriptionLimit();
    console.log('Subscription limit check completed, Reached:', subscriptionLimitReached);
  }, [user, timesSubmitted]);
  
  if(AuthLoading || isLoading) {
    return (
      <SafeAreaView  className='flex-1 bg-[#081726] justify-center items-center'>
        <ActivityIndicator size='large' color='#FFF'/>
        <Text className='text-lg text-white font-clearSans'>
          Obtendo Usuário
        </Text>
      </SafeAreaView>
    )
  }

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
           { subscriptionLimitReached ? 
              <View className='flex-1 bg-[#081726] justify-center items-center rounded-lg'>
                <Text className='text-lg text-white font-clearSans'>
                  Você já atingiu o limite de inscrições.
                </Text>
              </View>
                : 
           <SubscriptionForm 
            studentName={studentName}
            setStudentName={setStudentName}
            studentNumber={studentNumber}
            setStudentNumber={setStudentNumber}
            modalidade={modalidade}
            setModalidade={setModalidade}
            sala={sala}
            setSala={setSala}
            parentName={parentName}
            setParentName={setParentName}
            parentNumber={parentNumber}
            setParentNumber={setParentNumber}
            CPF={CPF}
            setCPF={setCPF}
            onSubmit={() => {
              handleSubscription();
              clearFields();
            }}
            isSubmitting={isSubmitting}
           />}
        </View>

      </ImageBackground>
    </SafeAreaView>
);
}