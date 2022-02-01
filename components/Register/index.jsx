import React from "react";
import { Center, Stack, Heading, Flex, Box, Image } from "native-base";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import screens from "~/constants/screens";
import Form from "./Form";

const Register = ({ navigation }) => {
  return (
    <Center>
      <Stack mt={50}>
        <Flex direction="row">
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.POST_SPLASH)}
          >
            <Box right={60} pt={2}>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </Box>
          </TouchableOpacity>

          <Image
            alt="image"
            source={require("~/assets/cornerstone-logo-250px.png")}
          />
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
