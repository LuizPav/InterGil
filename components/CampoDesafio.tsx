import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

type CampoDesafioProps={
    edital: boolean
}

export default function CampoDesafio({edital}: CampoDesafioProps) {
 return (
        <View className='flex-1 justify-center items-center'>
            <View className='w-[92%] h-[200px] bg-white rounded-lg mb-8 flex justify-center items-center'>

                {edital &&
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.logo}>
                            <Image
                                source={require('@/assets/images/intergilLogo.png')}
                                style={styles.logo}
                            />
                        </View>
                        <View style={styles.editalTexto}>
                            <Text style={{fontSize: 20}}>
                                Saiba todas as informações referente aos jogos internos!
                            </Text>
                        </View>
                    </View>
                }

                <View style={styles.areaBotao}>
                    <TouchableOpacity style={styles.botaoEntrar}>
                        <Text style={styles.textoBotao}>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({  
    logo:{
        maxHeight: 150,
        maxWidth: 150,
        zIndex: 1,
        
    },
    editalTexto:{
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        paddingTop: 30,
    },
    areaBotao:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: -78
    },
    botaoEntrar:{
        backgroundColor: '#092a56',
        borderRadius: 18,
        padding: 12,
        marginRight: 40,
        marginBottom: 30,
        alignItems: 'center'
    },
    textoBotao:{
        fontSize:22, 
        color: '#FFF'
    },
})