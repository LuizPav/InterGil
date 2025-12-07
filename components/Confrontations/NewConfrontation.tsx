import { homes } from "@/src/types";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

type NewConfrontationProps = {
  closeModal: () => void;
  addConfrontation: (
    home1: homes,
    home2: homes,
    modalidade: string,
    hour: string
  ) => void;
};

export default function NewConfrontation({
  closeModal,
  addConfrontation,
}: NewConfrontationProps) {
  const [home1, sethome1] = useState<homes>();
  const [home2, sethome2] = useState<homes>();
  const [modalidade, setModalidade] = useState("");
  const [hour, setHour] = useState("");

  const availableHouses = Object.values(homes);

  return (
    <View className="flex-1 justify-center items-center">
      <View className="h-128 w-[90%] bg-white justify-center items-center rounded-lg p-4">
        <View className="w-[90%] h-12 border-gray-400 border-2 border-solid rounded-lg pl-4 items-center justify-center mb-4">
          <Picker
            style={{ width: "100%", height: 48 }}
            onValueChange={sethome1}
            selectedValue={home1}
          >
            <Picker.Item
              label="Selecione a Primeira sala do Confronto"
              enabled={false}
              value=""
            />
            {availableHouses.map((house) => (
              <Picker.Item key={house} label={house} value={house} />
            ))}
          </Picker>
        </View>
        <View className="w-[90%] h-12 border-gray-400 border-2 border-solid rounded-lg pl-4 items-center justify-center mb-4">
          <Picker
            style={{ width: "100%", height: 48 }}
            onValueChange={sethome2}
            selectedValue={home2}
          >
            <Picker.Item
              label="Selecione a segunda sala do Confronto"
              enabled={false}
              value=""
            />
            {availableHouses.map((house) => (
              <Picker.Item key={house} label={house} value={house} />
            ))}
          </Picker>
        </View>
        <TextInput
          className="w-[90%] h-12 border-gray-400 border-2 border-solid rounded-lg pl-4 mb-4"
          value={hour}
          onChangeText={setHour}
          placeholder="Insira o horário do Confronto"
        />
        <TextInput
          className="w-[90%] h-12 border-gray-400 border-2 border-solid rounded-lg pl-4"
          value={modalidade}
          onChangeText={setModalidade}
          placeholder="Insira a modalidade do confronto"
        />
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() =>
              home1 && home2 && modalidade && hour
                ? addConfrontation(home1, home2, modalidade, hour)
                : null
            }
            className="mt-4 p-2 px-6 bg-blue-500 rounded"
          >
            <Text className="text-white">Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={closeModal}
            className="mt-4 p-2 px-6 bg-red-500 rounded"
          >
            <Text className="text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
