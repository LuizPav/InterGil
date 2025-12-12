import { icons } from "@/constants/icons";
import { IconsKeys } from "@/src/types";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
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
      layout={LinearTransition.springify().mass(0.8)}
      onPress={onPress}
      onLongPress={onLongPress}
      {...rest}
      className={`flex-1 items-center justify-center py-4 px-auto flex-row
        ${
          isFocused ? "bg-tabBarSelected flex-grow-1 px-4" : "bg-transparent"
        } rounded-full
        `}
    >
      {IconComponent({
        color: color,
        size: 22,
      })}
      {isFocused && (
        <Animated.Text
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
          className={`text-black text-md pl-2 font-semibold`}
        >
          {label}
        </Animated.Text>
      )}
    </AnimatedPressable>
  );
}
