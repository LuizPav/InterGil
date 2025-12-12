import { View, Text, FlatList, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/src/firebaseConnection";
import { house } from "@/src/types";
import { useEffect, useState } from "react";

import Images from "@/components/Homes/Images";
import Header from "@/components/Trophy/Header";

export default function Casas() {
  const [houses, setHouses] = useState<house[]>();

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const docRef = collection(db, "Houses");
        const q = query(docRef, orderBy("Ano", "asc"), orderBy("Curso", "asc"));
        const snapshot = await getDocs(q);

        const housesList = snapshot.docs.map((doc) => {
          return doc.data() as house;
        });

        setHouses(housesList);
        // console.log(housesList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHomes();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("@/assets/images/Backgrounds/TrophyBackground.png")}
        className="flex-1"
      >
        <Header title="Casas" bg="#081736" />
        <View className="w-full">
          <Text className="absolute left-28 text-white text-2xl font-horizon">
            ADM
          </Text>
          <Text className="absolute right-32 text-white text-2xl font-horizon">
            DS
          </Text>
        </View>
        <View className="flex-1 items-center mt-6">
          <FlatList
            data={houses}
            keyExtractor={(item) => item.Name}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            columnWrapperStyle={{
              justifyContent: "space-around",
              marginBottom: 15,
            }}
            renderItem={({ item }) => (
              <View className="w-[45%] items-center">
                <Images name={item.Name} instagramURL={item.InstagramURL} />
              </View>
            )}
            className="max-h-[92%]"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
