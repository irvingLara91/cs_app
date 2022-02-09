import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Center, Box, Text, Button } from "native-base";
import Carousel from "~/components/common/Carousel";
import screens from "~/constants/screens";

const Tutorial = () => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  return (
    <Center>
      <Box>
        <Carousel />
        <Text>Tutorial.jsx file</Text>
        <Box>
          <Button w="full" bgColor="dark.50" borderRadius="none" onPress={() => navigate({name: screens.NEW_ORDER_STEP_1})}>Continue</Button>
        </Box>
      </Box>
    </Center>
  );
}

export default Tutorial;