import { View, Text } from "react-native";
import HomeItem from "./HomeItem";
import { homes } from "@/src/types";

type ConfrontationFieldProps = {
  home1: homes;
  home2: homes;
  hour: string;
  day: string;
  modalidade: string;
};

export default function ConfrontationField({
  home1,
  home2,
  hour,
  day,
  modalidade,
}: ConfrontationFieldProps) {
  return (
    <View className="flex-1 w-[90%] m-auto mt-8 rounded-xl items-center justify-center bg-[#FFFC]">
      <View className="w-[85%] h-[200px] flex-row">
        <HomeItem home={home1} />

        <View className="flex-1 items-center justify-center">
          <Text className="text-black text-2xl font-bold mt-10">{day}</Text>
          <Text className="text-black text-2xl font-bold mt-2">0 | 0</Text>
          <Text className="text-black text-2xl font-bold mt-2">
            {modalidade}
          </Text>
          <View className="w-[80px] h-[40px] items-center justify-center bg-[#092a56] m-auto rounded-full">
            <Text className="font-bold text-white text-xl">{hour}</Text>
          </View>
        </View>

        <HomeItem home={home2} />
      </View>
    </View>
  );
}
