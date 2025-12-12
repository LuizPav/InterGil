import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

type NewChampionProps = {
  home: string[];
  onAdd: (name: string, ano: string, curso: string) => void;
  closeModal: () => void;
};

export default function NewChampion({
  home,
  closeModal,
  onAdd,
}: NewChampionProps) {
  const [selectedHouse, setSelectedHouse] = useState<string>();
  const [ano, setAno] = useState("");
  const [curso, setCurso] = useState("ADM");

  const handleSaveChampion = () => {
    if (!selectedHouse || !ano || !curso) {
      alert("Preencha todos os campos!");
      return;
    }
    onAdd(selectedHouse, ano, curso);
  };

  return (
    <View className="flex-1 justify-center items-center bg-black/50 px-4">
      <View className="w-full bg-white rounded-2xl p-6 shadow-lg">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-bold text-gray-800">Novo Campeão</Text>
          <TouchableOpacity
            onPress={closeModal}
            className="bg-red-100 p-2 rounded-full w-10 h-10 justify-center items-center"
          >
            <Text className="text-red-600 font-bold">X</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-600 mb-1 ml-1 font-bold">
          Casa Vencedora
        </Text>
        <View className="border border-gray-300 rounded-lg mb-4 overflow-hidden h-14 justify-center">
          <Picker
            selectedValue={selectedHouse}
            onValueChange={setSelectedHouse}
            style={{ width: "100%" }}
          >
            {home.map((houseName, index) => (
              <Picker.Item
                label={houseName}
                value={houseName}
                key={`${houseName}-${index}`}
              />
            ))}
          </Picker>
        </View>

        <Text className="text-gray-600 mb-1 ml-1 font-bold">Ano do Título</Text>
        <TextInput
          onChangeText={setAno}
          value={ano}
          className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50 text-lg h-14"
          keyboardType="numeric"
          placeholder="Ex: 2024"
        />

        <Text className="text-gray-600 mb-1 ml-1 font-bold">Curso</Text>
        <View className="border border-gray-300 rounded-lg mb-8 overflow-hidden h-14 justify-center">
          <Picker
            selectedValue={curso}
            onValueChange={setCurso}
            style={{ width: "100%" }}
          >
            <Picker.Item label="ADM" value="ADM" />
            <Picker.Item label="DS" value="DS" />
          </Picker>
        </View>

        <TouchableOpacity
          onPress={handleSaveChampion}
          className="bg-green-600 p-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold text-lg">
            Adicionar Campeão
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
