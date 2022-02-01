import React from "react";
import { Center, Stack, Heading, Flex, Box, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import screens from "~/constants/screens";
import Form from "./Form";

const Register = ({ navigation }) => {
  return (
    <Center>
      <Stack mt={50}>
        <Flex direction="row">
          <Box pt={2} paddingRight={60}>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.POST_SPLASH)}
            >
              <Box pt={2}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </Box>
            </TouchableOpacity>
          </Box>
          <Box pt={2} paddingRight={60}>
            <Image
              alt="image"
              source={require("~/assets/cornerstone-logo-250px.png")}
            />
          </Box>
        </Flex>
      </Stack>
      <Stack mt={3} space={4} w="75%" maxW="300px">
        <Heading>Complete the following information</Heading>
        <Form navigation={navigation} />
      </Stack>
    </Center>
  );
};

export default Register;
