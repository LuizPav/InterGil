import { FontAwesome5 } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';

type LoginFieldProps = {
  placeholder: string;
  type: 'default' | 'numeric';
  icon?: string
};

export default function LoginField({placeholder, type, icon}: LoginFieldProps) {
 return (
   <View className='flex flex-row w-[90%] items-center mx-auto my-10 border-b-2 border-[#A6A6A6] px-4'>
    {icon && (
      <FontAwesome5 name={icon} size={26} color='white'/> 
    )}
      {icon ? 
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={'#FFF'}
            keyboardType={type}
            className='flex-1 bg-transparent rounded-lg pl-4 pb-3 h-10 text-xl text-white mt-4 font-clearSans'
        />
        :
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={'#FFF'}
            keyboardType={type}
            className='flex-1 bg-transparent rounded-lg pb-3 h-10 text-xl text-white mt-2 font-clearSans'
        />
      }
   </View>
  );
}