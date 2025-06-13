import { TextInput } from 'react-native';
import { useEffect, useState } from 'react';

type subscriptionFieldProps = {
  label: string;
  type?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  value: string;
  onChangeText: (text: string) => void;
};

export default function SubscriptionField({label, type, value, onChangeText}: subscriptionFieldProps) {
 
  const [maxLength, setMaxLength] = useState(0);

  const formatTel = (Tel: string) => {
    let FTEL = Tel.replace(/\D/g, '');
    if(FTEL.length > 0) {
      FTEL = FTEL.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }
    return FTEL;
  }

  const formatCPF = (cpf: string) => {
    let FCPF = cpf.replace(/\D/g, '');
    if (FCPF.length > 10) {
      FCPF = FCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }
    return FCPF;
  }

  const whatFormat = (text: string) => {
    if (text.includes('Telefone')) {
      return formatTel;
    } else if (text.includes('CPF')) {
      return formatCPF;
    } else {
      return text;
    }
  }

  const maxLengthValidator = (text: string) => {
    if (text.includes('CPF')) {
      return setMaxLength(14);
    } else if (text.includes('Telefone')) {
      return setMaxLength(15);
    } else {
      return setMaxLength(200);
    }
  }

  useEffect(() => {
    maxLengthValidator(label);
  }, [label]);

  const handleOnChangeText = (text: string) => {
    
      let formattedText = text;
      if(label.includes('Telefone')) {
        formattedText = formatTel(text);
      } else if (label.includes('CPF')) {
        formattedText = formatCPF(text);
      }

    onChangeText(formattedText);
  }


  return (
   <TextInput 
               placeholder={label}
               keyboardType={ type || 'default' }
               placeholderTextColor={'#000'}
               maxLength={maxLength}
               onChangeText={handleOnChangeText}
               value={value}
               className='w-[90%] mx-auto p-2 pl-4 mb-8 h-[5%] border-b-2 border-[#004aad] mt-8 text-xl'
    />
  );


}