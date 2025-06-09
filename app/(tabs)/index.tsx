import CampoDesafio from '@/components/CampoDesafio';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {

 return (
   <SafeAreaView className='flex-1 bg-[#072042] justify-center items-center'>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className='mb-4'>
        <Text className='color-white ml-4 text-xl'>
          Edital
        </Text>
        <CampoDesafio edital={true} />
      </View>

      <View className='flex-1'>
        <CampoDesafio edital={false} />
        <CampoDesafio edital={false} />
        <CampoDesafio edital={false} />
        <CampoDesafio edital={false} />
        <CampoDesafio edital={false} />
      </View>

      <View style={{ backgroundColor: '#fff', width: 32, height: 32}} className='w-32 h-32 bg-white'>

      </View>
    </ScrollView>
   </SafeAreaView>
  );
}