import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
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
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="home" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="Trophy"
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="trophy" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="Subscription"
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome5 name="clipboard-list" size={size} color={color} />
            );
          },
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome5 name="user-circle" size={size} color={color} />
            );
          },
        }}
      />
    </Tabs>
  );
}
