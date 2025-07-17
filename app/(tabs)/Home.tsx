import ChallengeField from '@/components/ChallengeField';
import { View, Text, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

import { useAdminUser } from '@/hooks/useAdminUser';

export default function index() {

  const [isAdmin, setIsAdmin] = useState<boolean | null>(false);

  const { adminUser, isLoading } = useAdminUser();

  useEffect(() => {
    if(!isLoading) {
      setIsAdmin(adminUser);
      console.log('Admin User:', adminUser);
    }
  }, [adminUser, isLoading]);

  if(isLoading) {
    return (
      <SafeAreaView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#081736"/>
        <Text className='text-white text-2xl pt-4'>Loading...</Text>
      </SafeAreaView>
    );
  }

 return (
   
    <SafeAreaView className='flex-1 justify-center items-center'>
      <ImageBackground 
        source={require('@/assets/images/Backgrounds/homeBackground.png')}
        className='flex-1 w-full h-full'
        resizeMode='cover'
      >
      <ScrollView className='flex-1 w-full h-full'
        showsVerticalScrollIndicator={false}
      >
        <Text className='text-3xl text-white ml-6 mt-4 mb-2 font-horizon'>
          Home
        </Text>

        <View className='w-[92%] m-auto'>
          <Text className='color-white ml-4 mt-4 mb-4 text-2xl font-horizon'>
            Edital
          </Text>
          <ChallengeField edital={true} />
        </View>

        <View className='flex-1 w-[92%] m-auto'>
          <Text className='color-white ml-4 text-2xl font-horizon mb-4'>
            Desafio
          </Text>
          <ChallengeField edital={false} isAdmin={isAdmin}/>
          <ChallengeField edital={false} isAdmin={isAdmin}/>
          <ChallengeField edital={false} isAdmin={isAdmin}/>
          <ChallengeField edital={false} isAdmin={isAdmin}/>
          <ChallengeField edital={false} isAdmin={isAdmin}/>
        </View>
      </ScrollView>
   </ImageBackground>
  </SafeAreaView>
  );
}