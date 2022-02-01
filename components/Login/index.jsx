import React from "react";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Link } from "@react-navigation/native";
import { Stack, Box, Center, Image, Flex, Pressable } from "native-base";
import Form from "./Form";
import ReferenceImage from "~/assets/image.png";
import screens from "~/constants/screens";
import styles from "./styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function Login(props) {
  const { passwordRecoveryLink } = styles;
  return (
    <Center>
      <Stack mt={50}>
        <Flex direction="row">
          <TouchableOpacity
            onPress={() => props.navigation.navigate(screens.POST_SPLASH)}
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
        <Center mt={20} mb={20}>
          <Image source={ReferenceImage} alt="reference login image" />
        </Center>
        <Form />
        <Box>
          <Link
            to={{ screen: screens.PASSWORD_RECOVERY }}
            style={passwordRecoveryLink}
          >
            Did you forget your password?
          </Link>
        </Box>
      </Stack>
    </Center>
  );
}
