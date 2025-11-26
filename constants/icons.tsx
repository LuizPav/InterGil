import { FontAwesome5 } from "@expo/vector-icons";

type TabBarIconProps = {
  color: string;
  size: number;
};

export const icons = {
  Home: (props: TabBarIconProps) => <FontAwesome5 name="home" {...props} />,
  Trophy: (props: TabBarIconProps) => <FontAwesome5 name="trophy" {...props} />,
  Subscription: (props: TabBarIconProps) => (
    <FontAwesome5 name="clipboard-list" {...props} />
  ),
  Profile: (props: TabBarIconProps) => (
    <FontAwesome5 name="user-circle" {...props} />
  ),
};
