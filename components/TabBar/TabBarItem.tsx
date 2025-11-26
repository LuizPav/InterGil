import { icons } from "@/constants/icons";
import { IconsKeys } from "@/src/types";
import { useEffect } from "react";
import { Pressable, Text, PressableProps } from "react-native";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type TabBarItemProps = PressableProps & {
  onPress: () => void;
  onLongPress: () => void;
  routeName: IconsKeys;
  isFocused: boolean;
  color: string;
  label: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TabBarItem({
  onPress,
  onLongPress,
  color,
  label,
  routeName,
  isFocused,
  ...rest
}: TabBarItemProps) {
  const IconComponent = icons[routeName];

  return (
    <AnimatedPressable
      layout={LinearTransition.duration(500)}
      onPress={onPress}
      onLongPress={onLongPress}
      {...rest}
      className={`flex-1 items-center justify-center py-4 px-auto flex-row
        ${
          isFocused
            ? "bg-tabBarSelected flex-grow-1 px-4 mx-2"
            : "bg-transparent"
        } rounded-full
        `}
    >
      {IconComponent({
        color: color,
        size: 22,
      })}
      {isFocused && (
        <Text className={`text-black text-md pl-2 font-semibold`}>{label}</Text>
      )}
    </AnimatedPressable>
  );
}
