import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

import LoginScreen from "~/components/Login";
import HomeScreen from "~/components/Home";
import PasswordRecovery from "~/components/Login/PasswordRecovery";

import screens from "~/constants/screens";

export default function App() {
  const Stack = createNativeStackNavigator();
  const { Navigator, Screen } = Stack;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Navigator>
          <Screen
            name={screens.HOME}
            component={HomeScreen}
          />
          <Screen
            name={screens.LOGIN}
            component={LoginScreen}
          />
          <Screen
            name={screens.PASSWORD_RECOVERY}
            component={PasswordRecovery}
          />
        </Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
