import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useAuthUser } from "@/src/contexts/authUserContext";
import { homes } from "@/src/types";

import ConfrontationField from "@/components/Confrontations/ConfrotationField";
import NewConfrontation from "@/components/Confrontations/NewConfrontation";

export default function Confronto() {
  const router = useRouter();

  const { userData, isLoading } = useAuthUser();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confrontos, setConfrontos] = useState([
    {
      id: (Date.now() + 3).toString(),
      home1: homes.Arcania,
      home2: homes.Spartta,
      modalidade: "Basquete",
      hour: "10:00",
    },
    {
      id: (Date.now() + 2).toString(),
      home1: homes.Alatares,
      home2: homes.Atlantis,
      modalidade: "Futsal",
      hour: "11:00",
    },
    {
      id: (Date.now() + 1).toString(),
      home1: homes.Midgard,
      home2: homes.Valhalla,
      modalidade: "Volei",
      hour: "12:00",
    },
    {
      id: (Date.now() + 4).toString(),
      home1: homes.Electra,
      home2: homes.Extreme,
      modalidade: "Queimado",
      hour: "14:00",
    },
    {
      id: (Date.now() + 5).toString(),
      home1: homes.Ardharia,
      home2: homes.Hunters,
      modalidade: "Handebol",
      hour: "16:00",
    },
    {
      id: (Date.now() + 6).toString(),
      home1: homes.Imperiais,
      home2: homes.Monarcas,
      modalidade: "Basquete",
      hour: "17:00",
    },
  ]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator color="#f8a000" size="large" />
        <Text className="text-center text-lg text-white font-clearSans mt-4">
          Carregando...
        </Text>
      </View>
    );
  }

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const addConfrontation = (
    home1: homes,
    home2: homes,
    modalidade: string,
    hour: string
  ) => {
    setConfrontos((prev) => [
      ...prev,
      { id: Date.now().toString(), home1, home2, modalidade, hour: hour },
    ]);
    console.log(confrontos);
    setEditModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("@/assets/images/Backgrounds/confrontosBackground.png")}
        className="flex-1"
      >
        <View className="flex-row items-center pt-[20px] pl-[20px]">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className="mb-3"
          >
            <AntDesign name="arrowleft" size={24} color={"white"} />
          </TouchableOpacity>
          <Text className="w-[88%] text-3xl text-white text-center font-horizon">
            Confrontos
          </Text>

          {userData?.admin && (
            <TouchableOpacity onPress={openEditModal} className="mb-3">
              <AntDesign name="edit" size={24} color={"white"} />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={confrontos.sort((a, b) => {
            return a.hour.localeCompare(b.hour);
          })}
          renderItem={({ item }) => (
            <ConfrontationField
              home1={item.home1}
              home2={item.home2}
              hour={item.hour}
              modalidade={item.modalidade}
            />
          )}
          className="max-h-[83%]"
        />

        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent={true}
        >
          <NewConfrontation
            closeModal={() => setEditModalVisible(false)}
            addConfrontation={addConfrontation}
          />
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}
