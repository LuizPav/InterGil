import { useCloudinaryImages } from "@/hooks/useCloudinaryImages";
import { homes } from "@/src/types";
import { View, Text, Image, ImageBackground } from "react-native";

type winnerItemProps = {
  name: string;
  ano: number;
};

export default function WinnerItem({ name, ano }: winnerItemProps) {
  const { imageURL } = useCloudinaryImages(name);

  return (
    <View className="mb-4">
      <ImageBackground
        className="w-full h-28 justify-center items-center"
        source={require("@/assets/images/faixaVetor.png")}
        resizeMode="contain"
      >
        <Text className="absolute top-3 left-[42%] text-black font-horizon text-3xl text-center">
          {ano}
        </Text>
      </ImageBackground>
      <View className="items-center">
        <Image
          source={{ uri: imageURL }}
          className="w-64 h-64 object-contain rounded-xl"
        />
        <Text className="text-white text-2xl font-bold pt-2">{name}</Text>
      </View>
    </View>
  );
}
