import { Picker } from '@react-native-picker/picker';
import { Text, View, ImageBackground, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tela3() {
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

        <View className='bg-white h-[800px] w-[90%] rounded-lg mx-auto'>
          <TextInput 
            placeholder='Nome completo'
            placeholderTextColor={'#000'}
            className='w-[90%] mx-auto p-4 mb-8 h-[30px] border-b-2 border-[#004aad]'
          />

          <TextInput 
          placeholder='Telefone(Aluno)'
          keyboardType='numeric'
          placeholderTextColor={'#000'}
          className='w-[90%] mx-auto p-4 h-[30px] border-b-2 border-[#004aad]'
          />
        </View>


        <Picker
          className='bg-[#072042] w-[90%] rounded-lg mx-auto font-bold text-white text-2xl'
          placeholder='Modalidades'
        >
          <Picker.Item label="Modalidade 1" value="modalidade1" />
        </Picker>

      </ImageBackground>
    </SafeAreaView>
);
}