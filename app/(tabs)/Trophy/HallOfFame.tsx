import { Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import Header from "@/components/Trophy/Header";
import WinnerItem from "@/components/HallOfFame/WinnerItem";

import { champions, homes } from "@/src/types";
import { db } from "@/src/firebaseConnection";
import { useAuthUser } from "@/src/contexts/AuthUserContext";
import NewChampion from "@/components/HallOfFame/NewChampion";

export default function HallOfFame() {
  const [champions, setChampions] = useState<champions[]>();
  const [modalVisible, setModalVisible] = useState(false);

  const { userData } = useAuthUser();

  const availableHomes = Object.values(homes);

  const fetchChampions = async () => {
    try {
      const docRef = collection(db, "Champions");
      const q = query(docRef, orderBy("Ano", "asc"));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const championsList = snap.docs.map((doc) => {
          return doc.data();
        });
        setChampions(championsList as champions[]);
      } else {
        throw new Error("Nenhum campeão encontrado!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChampions();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddChampion = async (
    selectedName: string,
    selectedAno: string,
    selectedCurso: string
  ) => {
    try {
      const docRef = collection(db, "Champions");
      await addDoc(docRef, {
        Ano: parseInt(selectedAno),
        Name: selectedName,
        Curso: selectedCurso,
      });
      setModalVisible(false);
      fetchChampions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-base">
      <Header
        title="Hall Of Fame"
        edit={true}
        isAdmin={userData?.admin}
        openEditModal={toggleModal}
      />
      <ScrollView className="flex-1 max-h-[85%]">
        {champions?.map((item, index) => {
          return <WinnerItem name={item.Name} ano={item.Ano} key={index} />;
        })}
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <NewChampion
          home={availableHomes}
          onAdd={handleAddChampion}
          closeModal={toggleModal}
        />
      </Modal>
    </SafeAreaView>
  );
}
