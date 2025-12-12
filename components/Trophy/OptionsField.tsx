import { View } from "react-native";
import TrophyOption from "./TophyOption";

export default function OptionsField() {
  return (
    <View className="flex-1 flex-row flex-wrap justify-around">
      <TrophyOption
        image={require("@/assets/images/TrophyIcons/Ball.png")}
        route="/Trophy/Modalidades"
        title="Modalidades"
      />
      <TrophyOption
        image={require("@/assets/images/TrophyIcons/VS.png")}
        route="/Trophy/Confronto"
        title="Confrontos"
      />
      <TrophyOption
        image={require("@/assets/images/TrophyIcons/Trophy.png")}
        route="/Trophy/HallOfFame"
        title="Hall da Fama"
      />
      <TrophyOption
        image={require("@/assets/images/TrophyIcons/Home.png")}
        route="/Trophy/Casas"
        title="Casas"
      />
    </View>
  );
}
