import { homes } from "@/constants/types";
import { useCloudinaryImages } from "@/hooks/useCloudinaryImages";
import { View, Text, Image } from "react-native";

type HomeItemProps = {
  home: homes;
};

export default function HomeItem({ home }: HomeItemProps) {
  const { imageURL } = useCloudinaryImages(home);

  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={{ uri: imageURL }}
        className="w-[100px] h-[100px] mx-auto my-4 rounded-full"
        resizeMode="contain"
      />
      <Text className="text-center text-2xl font-bold">{home}</Text>
    </View>
  );
}
