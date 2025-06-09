import { View, TouchableOpacity, Text, Image } from 'react-native';

type CampoDesafioProps={
    edital: boolean
}

export default function CampoDesafio({edital}: CampoDesafioProps) {
 return (
        <View className='flex-1 justify-center items-center'>
            <View className='w-[92%] h-[200px] bg-white rounded-[15px] mb-8 flex flex-col'>

                {edital &&
                    <View className='flex-row items-center p-6'>
                        <View className='h-[150px] w-[150px] z-10 mr-6'>
                            <Image
                                source={require('@/assets/images/intergilLogo.png')}
                                className='w-full h-full object-contain'
                            />
                        </View>
                        <View className='flex-1 justify-center items-start pt-4'>
                            <Text className='text-[20px]'>
                                Saiba todas as informações referente aos jogos internos!
                            </Text>
                        </View>
                    </View>
                }

                <View className='flex-1 justify-end items-end mt-[-78px]'>
                    <TouchableOpacity className='bg-[#092a56] rounded-xl p-3 mr-10 mb-8 items-center'>
                        <Text className='text-[22px] text-white'>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  );
}