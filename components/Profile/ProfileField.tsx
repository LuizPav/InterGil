import { homes } from "@/src/types";
import { useCloudinaryImages } from "@/hooks/useCloudinaryImages";
import { View, Text, Image } from "react-native";

type ProfileFieldProps = {
  name: string;
  matricula?: string;
  house?: string;
  image: homes;
};

export default function ProfileField({
  name,
  matricula,
  house,
  image,
}: ProfileFieldProps) {
  const { imageURL } = useCloudinaryImages(image);
  return (
    <View className="flex-row items-center mb-8 pl-4 mx-auto w-[85%] h-[150px] bg-[#092a56] rounded-2xl">
      <Image
        source={{ uri: imageURL }}
        className="w-[100px] h-[100px] rounded-full mb-4"
        resizeMode="cover"
      />
      <View className="flex-1 justify-center ml-4">
        <Text className="text-white text-2xl font-bold pb-2">{name}</Text>
        <Text className="text-white text-lg pb-2">Matrícula: {matricula}</Text>
        <Text className="text-white text-lg">Casa: {house}</Text>
      </View>
    </View>
  );
}
