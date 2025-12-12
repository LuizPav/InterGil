import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

import { db } from "@/src/firebaseConnection";
import { useAuthUser } from "@/src/contexts/AuthUserContext";
import { confronto } from "@/src/types";

import ConfrontationField from "@/components/Confrontations/ConfrotationField";
import NewConfrontation from "@/components/Confrontations/NewConfrontation";
import Header from "@/components/Trophy/Header";

export default function Confronto() {
  const { userData, isLoading } = useAuthUser();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confrontos, setConfrontos] = useState<confronto[]>();

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

  useEffect(() => {
    const docRef = collection(db, "Confrontos");
    const getConfrontations = onSnapshot(docRef, (snapshot) => {
      try {
        if (!snapshot.empty) {
          const confrontationsList = snapshot.docs.map((doc) => {
            const data = doc.data() as confronto;
            return {
              ...data,
            };
          });

          setConfrontos(confrontationsList);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return () => getConfrontations();
  }, []);

  const NewConfrontations = async ({
    data,
    local,
    modalidade,
    timeA,
    timeB,
    id,
    status,
  }: confronto) => {
    try {
      const dbRef = collection(db, "Confrontos");

      const docRef = await addDoc(dbRef, {
        data: data,
        local: local,
        modalidade: modalidade,
        timeA: timeA,
        timeB: timeB,
        status: status,
        id: id,
      });
      console.log(`confronto | ${docRef.id} | Criado!`);

      setEditModalVisible(false);

      return docRef.id;
    } catch (error) {
      console.error("Erro ao criar confronto: " + error);
      throw error;
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("@/assets/images/Backgrounds/confrontosBackground.png")}
        className="flex-1"
      >
        <Header
          edit={true}
          openEditModal={openEditModal}
          isAdmin={userData?.admin}
          title="Confrontos"
        />

        <FlatList
          keyExtractor={(item) => item.id}
          data={confrontos?.sort((a, b) => {
            return a.data
              .toDate()
              .toLocaleString()
              .localeCompare(b.data.toDate().toLocaleString());
          })}
          renderItem={({ item }) => (
            <ConfrontationField
              home1={item.timeA}
              home2={item.timeB}
              hour={item.data
                .toDate()
                .toLocaleTimeString()
                .replace(/:\d{2}$/, "")}
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
            addConfrontation={NewConfrontations}
          />
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}
