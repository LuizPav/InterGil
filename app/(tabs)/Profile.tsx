import { SafeAreaView } from "react-native-safe-area-context";
import {
  ImageBackground,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import ModalidadesField from "@/components/ModalidadesField";
import ProfileField from "@/components/ProfileField";

import { homes } from "@/src/types";

import { useAuthUser } from "@/src/contexts/authUserContext";
import { useFirebaseReference } from "@/hooks/useFirebaseReference";

export default function Profile() {
  const { userData, isLoading, logout } = useAuthUser();

  const housePath = userData?.house;

  const { data: houseData, isLoading: houseLoading } = useFirebaseReference(
    housePath?.path
  );

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.navigate("/Login");
  };

  if (isLoading || houseLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#081736]">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white">Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("@/assets/images/Backgrounds/ProfileBackground.png")}
        className="flex-1 w-full h-full"
      >
        <View className="items-center justify-center h-[270px]">
          <Image
            source={require("@/assets/images/intergilLogo.png")}
            className="w-[150px] h-[150px] mb-4"
            resizeMode="cover"
          />
          <Text className="font-horizon text-3xl text-white mb-8">Perfil</Text>
        </View>

        <ProfileField
          name={userData?.name || "..."}
          matricula={userData?.matricula}
          house={houseData?.Name}
          image={houseData?.Name as homes}
        />

        <ModalidadesField />

        <View className="flex-column items-center justify-center my-8">
          <TouchableOpacity
            className="items-start justify-start"
            onPress={handleLogout}
          >
            <MaterialIcons
              name="logout"
              color={"white"}
              size={25}
              className="pb-4"
            />
          </TouchableOpacity>
          <View className="mx-auto w-[90%] bg-[#9299ce] h-[2px]" />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
