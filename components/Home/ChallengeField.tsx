import { useState } from "react";
import { View, TouchableOpacity, Text, Image, Modal } from "react-native";
import EditalExpanded from "./EditalExpanded";

type CampoDesafioProps = {
  edital: boolean;
  isAdmin?: boolean | null;
};

export default function ChallengeField({ edital, isAdmin }: CampoDesafioProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-[92%] h-[200px] bg-white rounded-[15px] mb-8 flex flex-col">
        {edital && (
          <View className="flex-row">
            <View className="h-[200px] w-[150px] z-10 mr-6">
              <Image
                source={require("@/assets/images/intergilLogo.png")}
                className="w-full h-full object-contain"
              />
            </View>
            <View className="flex-1 justify-center items-start pt-4 mt-[-80px] ml-[-40px]">
              <Text className="text-[20px]">
                Saiba todas as informações referente aos jogos internos!
              </Text>
            </View>
          </View>
        )}

        <View className="flex-1 justify-end items-end mt-[-78px]">
          <TouchableOpacity
            className="bg-[#092a56] rounded-3xl p-3 mr-10 mb-8 items-center"
            onPress={() => {
              setModalVisible(!modalVisible);
              console.log("cliquei");
            }}
          >
            <Text className="text-[22px] text-white font-hanken-medium">
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <EditalExpanded
          closeModal={() => setModalVisible(!modalVisible)}
          isAdmin={isAdmin}
        />
      </Modal>
    </View>
  );
}
