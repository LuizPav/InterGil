import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import TabBarItem from "./TabBarItem";
import { IconsKeys } from "@/src/types";

export default function TabBar(props: BottomTabBarProps) {
  const { colors } = useTheme();
  const { state, descriptors, navigation } = props;

  return (
    <View className="flex-row rounded-full absolute bottom-10 inset-x-10 bg-white shadow-lg px-auto py-2">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const typedRouteName = route.name as IconsKeys;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        return (
          <TabBarItem
            onPress={onPress}
            onLongPress={onLongPress}
            routeName={typedRouteName}
            isFocused={isFocused}
            key={route.name}
            color={isFocused ? colors.primary : colors.text}
            label={label}
          />
        );
      })}
    </View>
  );
}
