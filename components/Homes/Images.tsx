import { useCloudinaryImages } from "@/hooks/useCloudinaryImages";
import { View, Image } from "react-native";

type imagesProps = {
  name: string;
};

export default function Images({ name }: imagesProps) {
  const { imageURL } = useCloudinaryImages(name);

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={{ uri: imageURL }}
        className="w-52 h-52 object-contain rounded-lg"
      />
    </View>
  );
}
