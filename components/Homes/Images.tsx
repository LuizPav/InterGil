import { useCloudinaryImages } from "@/hooks/useCloudinaryImages";
import { View, Image, Linking, Pressable } from "react-native";

type imagesProps = {
  name: string;
  instagramURL: string;
};

export default function Images({ name, instagramURL }: imagesProps) {
  const { imageURL } = useCloudinaryImages(name);

  const handleOpenMedias = async () => {
    try {
      Linking.openURL(instagramURL);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Pressable onPress={handleOpenMedias}>
        <Image
          source={{ uri: imageURL }}
          className="w-52 h-52 object-contain rounded-lg"
        />
      </Pressable>
    </View>
  );
}
