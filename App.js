import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

import LoginScreen from "~/components/Login";
import HomeScreen from "~/components/Home";

import routes from "~/constants/routes";

export default function App() {
  const Stack = createNativeStackNavigator();
  const { Navigator, Screen } = Stack;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Navigator>
          <Screen
            name={routes.HOME}
            component={HomeScreen}
          />
          <Screen
            name={routes.LOGIN}
            component={LoginScreen}
          />
        </Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
