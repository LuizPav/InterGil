import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';

type LoginFieldProps = {
  placeholder: string;
  type?: 'default' | 'numeric' | 'email-address';
  icon?: string;
  onTextChange?: (value: string) => void;
  value: string;
  secureTextEntry?: boolean;
  minLength?: number; 
};

export default function LoginField({ placeholder, type, icon, value, onTextChange, secureTextEntry, minLength = 1 }: LoginFieldProps) {

const [inputError, setInputError] = useState<string | null>(null);

  const handleInputChange = (text: string) => {
    onTextChange?.(text);

    if (minLength !== undefined) {
      if (text.length > 0 && text.length < minLength) {
        setInputError(`${placeholder} deve ter no mínimo ${minLength} caracteres.`);
      } else {
        setInputError(null); 
      }
    }
  };

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
            value={value}
            onChangeText={handleInputChange}
            secureTextEntry={secureTextEntry ?? false}
            className='flex-1 bg-transparent rounded-lg pl-4 pb-3 h-10 text-xl text-white mt-4 font-clearSans'
        />
        :
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={'#FFF'}
            value={value}
            onChangeText={handleInputChange}
            secureTextEntry={secureTextEntry ?? false}
            keyboardType={type}
            className='flex-1 bg-transparent rounded-lg pb-3 h-10 text-xl text-white mt-2 font-clearSans'
        />
      }
         {inputError && (
        <Text className='text-red-500 text-2xl font-bold mt-1 self-start font-clearSans'>
          {inputError}
        </Text>
      )}
   </View>
  );
}