import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

type headerProps = {
  edit?: boolean;
  isAdmin?: boolean | null;
  openEditModal?: () => void;
  title: string;
  bg?: string;
};

export default function Header({
  edit,
  isAdmin,
  openEditModal,
  title,
  bg,
}: headerProps) {
  const router = useRouter();

  const bkg = bg ? `bg-[${bg}]` : "";

  return (
    <View className={`flex-row items-center pt-[20px] pl-[20px] ${bkg}`}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        className="mb-3"
      >
        <AntDesign name="arrowleft" size={24} color={"white"} />
      </TouchableOpacity>
      <Text className="w-[88%] text-3xl text-white text-center font-horizon">
        {title}
      </Text>

      {edit && isAdmin && (
        <TouchableOpacity onPress={openEditModal} className="mb-3">
          <AntDesign name="edit" size={24} color={"white"} />
        </TouchableOpacity>
      )}
    </View>
  );
}
