import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar/TabBar";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
    />
  );
}
