import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import TabBarItem from "./TabBarItem";
import { IconsKeys } from "@/src/types";

export default function TabBar(props: BottomTabBarProps) {
  const { colors } = useTheme();
  const { state, descriptors, navigation } = props;

  const ordenedRoutes = ["Home", "Trophy", "Subscription", "Profile"];

  const sortedRoutes = [...state.routes].sort((a, b) => {
    const indexA = ordenedRoutes.indexOf(a.name);
    const indexB = ordenedRoutes.indexOf(b.name);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  return (
    <View className="flex-row rounded-full absolute bottom-10 inset-x-10 bg-white elevation-10 px-4 py-2">
      {sortedRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const typedRouteName = route.name as IconsKeys;

        const isFocused = state.index === state.routes.indexOf(route);

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
