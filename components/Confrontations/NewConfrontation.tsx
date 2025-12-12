import { confronto, homes, locais, modalidades } from "@/src/types";
import { Picker } from "@react-native-picker/picker";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type NewConfrontationProps = {
  closeModal: () => void;
  addConfrontation: ({
    timeA,
    timeB,
    data,
    local,
    modalidade,
  }: confronto) => void;
};

export default function NewConfrontation({
  closeModal,
  addConfrontation,
}: NewConfrontationProps) {
  const [home1, sethome1] = useState<homes>();
  const [home2, sethome2] = useState<homes>();
  const [modalidade, setModalidade] = useState("");
  const [local, setLocal] = useState("");
  const [date, setDate] = useState<Date>();
  const [dateVisible, setDateVisible] = useState(false);

  const availableHouses = Object.values(homes);
  const availableModalidades = Object.values(modalidades);
  const availableLocais = Object.values(locais);

  const onConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    setDateVisible(false);
  };

  const handleAddConfrontation = () => {
    if (home1 && home2 && modalidade && date && local) {
      addConfrontation({
        timeA: home1,
        timeB: home2,
        data: Timestamp.fromDate(date),
        local: local,
        modalidade: modalidade,
        id: `${home1}-${home2}-${modalidade}-${date.toLocaleDateString()}`,
        status: "agendado",
      });
    } else {
      throw new Error("Preencha todos os campos!");
    }
  };

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
        <TouchableOpacity
          onPress={() => setDateVisible(true)}
          className="w-[90%] h-14 border-gray-400 border-2 border-solid rounded-lg pl-4 mb-4 items-center justify-center"
        >
          <Text className="text-2xl text-center font-bold">
            {date ? date.toLocaleString() : "Selecione a data do confronto"}
          </Text>
        </TouchableOpacity>
        <View className="w-[90%] h-12 border-gray-400 border-2 border-solid rounded-lg pl-4 items-center justify-center mb-4">
          <Picker
            style={{ width: "100%", height: 48 }}
            onValueChange={setModalidade}
            selectedValue={modalidade}
          >
            <Picker.Item
              label="Selecione a modalidade do Confronto"
              enabled={false}
              value=""
            />
            {availableModalidades.map((modalidades) => (
              <Picker.Item
                key={modalidades}
                label={modalidades}
                value={modalidades}
              />
            ))}
          </Picker>
        </View>
        <View className="w-[90%] h-12 border-gray-400 border-2 border-solid rounded-lg pl-4 items-center justify-center mb-4">
          <Picker
            style={{ width: "100%", height: 48 }}
            onValueChange={setLocal}
            selectedValue={local}
            placeholder="selecione a segunda sala do confronto"
          >
            <Picker.Item
              label="Selecione a segunda sala do Confronto"
              enabled={false}
              value=""
            />
            {availableLocais.map((locais) => (
              <Picker.Item key={locais} label={locais} value={locais} />
            ))}
          </Picker>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={handleAddConfrontation}
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
        <DateTimePickerModal
          onConfirm={onConfirmDate}
          onCancel={() => setDateVisible(false)}
          isVisible={dateVisible}
          mode={"datetime"}
          date={date}
          is24Hour={true}
        />
      </View>
    </View>
  );
}
