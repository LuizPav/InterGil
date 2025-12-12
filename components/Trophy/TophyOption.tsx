import { Image, Pressable, Text } from "react-native";
import { Href, useRouter } from "expo-router";

type TrophyOptionProps = {
  route: Href;
  image: number;
  title: string;
};

export default function TrophyOption({
  image,
  route,
  title,
}: TrophyOptionProps) {
  const router = useRouter();

  return (
    <Pressable
      className="w-[200px] h-[250px] bg-white rounded-lg shadow-lg items-center mb-10"
      onPress={() => router.push(route)}
    >
      <Image source={image} className="w-[80%] h-[70%]" resizeMode="contain" />
      <Text className="text-3xl pb-8 pt-0">{title}</Text>
    </Pressable>
  );
}
