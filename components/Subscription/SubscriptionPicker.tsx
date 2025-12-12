import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

type SubscriptionPickerProps = {
  label: string;
  selectedValue?: string;
  onValueChange?: (itemValue: string, ) => void;
  
};

export default function SubscriptionPicker({label, selectedValue, onValueChange}: SubscriptionPickerProps) {

  return (
      <View className="h-[50px] w-[95%] bg-[#072042] rounded-full mx-auto mb-8">
        {/* Picker não aceita o uso de className, então usei o estilo inline */}
        <Picker
          style={{
            backgroundColor:'#072042',
            color: '#fff',
            width: '90%',
            height: 50,
            marginLeft: '5%',
            padding: 5,
            borderRadius: 100,
            fontSize: 20,
          }}
          dropdownIconColor={'#fff'}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          
        >
          <Picker.Item label={label} value="" enabled={false} color='#0000'/>
          <Picker.Item label={label.includes('Modalidades') ? 'FreeFire' : 'Infernais'} value={label.includes('Modalidades') ? 'FreeFire' : 'Infernais'} color="#000"/>
          <Picker.Item label={label.includes('Modalidades') ? 'FIFA' : 'Comando'} value={label.includes('Modalidades') ? 'FIFA' : 'Comando'} color="#000"/>
          <Picker.Item label={label.includes('Modalidades') ? 'Vôlei' : 'Alpha Lupi'} value={label.includes('Modalidades') ? 'Vôlei' : 'Alpha Lupi'} color="#000"/>
          <Picker.Item label={label.includes('Modalidades') ? 'Futsal' : 'Guardians'} value={label.includes('Modalidades') ? 'Futsal' : 'Guardians'} color="#000"/>
          
        </Picker>
      </View>
  
  );
}