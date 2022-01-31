import { Link } from "@react-navigation/native";
import { View } from 'react-native';
import screens from "~/constants/screens";

export default function Home({navigation}) {
  return (
    <View>
      <Link to={{ screen: screens.LOGIN }}>Login Screen</Link>
    </View>
  );
}

