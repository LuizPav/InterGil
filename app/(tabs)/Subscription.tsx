import { Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/src/firebaseConnection';

import SubscriptionForm from '@/components/SubscriptionForm';
import { useAuthUser } from '@/hooks/useAuthUser'

export default function Subscription() {

  const { user, isLoading } = useAuthUser();

  const [studentName, setStudentName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [sala, setSala] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentNumber, setParentNumber] = useState('');
  const [CPF, setCPF] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // useEffect(() => {
  //   const userid = onAuthStateChanged(auth, (user) => {
  //     user ? 
  //     setUserId(user.uid)
  //     :
  //     setUserId(null);
  //   });
  //   setIsLoading(false);
  //   return () => userid();
  // }, []);

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
    setIsSubmitting(false);
  }
}

  if(isLoading){
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
           />
        </View>

      </ImageBackground>
    </SafeAreaView>
);
}