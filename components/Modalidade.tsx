import { useAuthUser } from "@/src/contexts/authUserContext";
import { db } from "@/src/firebaseConnection";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";

type ModalidadeProps = {
  option: string;
  itemOption: "name" | "Horario" | "Lugar" | "Data";
};

type modalidadesData = {
  name: string;
  Lugar: string;
  Horario: string;
  Data: string;
};

export default function Modalidade({ option, itemOption }: ModalidadeProps) {
  const [modalidades, setModalidades] = useState<modalidadesData[]>([]);
  const { user } = useAuthUser();

  useEffect(() => {
    async function fetchModalidadesData() {
      if (!user) {
        console.log("Sem userID");
        return;
      }

      try {
        const userSubRef = collection(
          db,
          "Users",
          user.uid,
          "ModalidadesInscritas"
        );
        const userSubSnapshot = await onSnapshot(
          userSubRef,
          async (querySnapshot) => {
            // console.log("empty snapshot?", userSubSnapshot.empty);
            let subModalidadesId: string[] = [];
            // Pegando os Id dos documentos(nomes das modalidades inscritas)
            querySnapshot.forEach((docSnapshot) => {
              subModalidadesId.push(docSnapshot.id);
            });
            // console.log(subModalidadesId)

            const modalidadesCollectionRef = collection(db, "Modalidades");

            const tempDisplayModalidade: modalidadesData[] = [];
            for (const modalidadeID of subModalidadesId) {
              //pegando os dados de cada um dos documentos
              const modalidadesDocRef = doc(
                modalidadesCollectionRef,
                modalidadeID
              );
              // buscando no firebase
              const modalidadesSnapshot = await getDoc(modalidadesDocRef);

              if (modalidadesSnapshot.exists()) {
                // console.log(modalidadesSnapshot.data())
                const data = modalidadesSnapshot.data() as modalidadesData;
                tempDisplayModalidade.push({
                  name: data.name,
                  Lugar: data.Lugar,
                  Horario: data.Horario,
                  Data: data.Data,
                });
                // console.log(tempDisplayModalidade)
              }
            }
            setModalidades(tempDisplayModalidade);
            // console.log(modalidades)
          }
        );
      } catch (err) {
        console.log("Erro na busca de modalidaes: ", err);
      }
    }

    fetchModalidadesData();
  }, [user?.uid]);

  return (
    <View className="items-center">
      {/* Cabeçalho */}
      <Text className="px-8 text-xl text-white">{option}</Text>
      {/* Item */}
      {modalidades.map((item, index) => (
        <View key={index} className="px-8">
          <Text className="text-white text-center py-1 text-xl font-bold">
            {item[itemOption] !== undefined ? String(item[itemOption]) : "N/A"}
          </Text>
        </View>
      ))}
    </View>
  );
}
