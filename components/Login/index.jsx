import { Link } from '@react-navigation/native';
import { Stack, Box, Center } from 'native-base';
import { Text, View, Image } from 'react-native';
import Form from "./Form";
const ReferenceImage = require("~/assets/image.png")
import screens from "~/constants/screens";

export default function Login(props) {
  return (
    <Center>
      <Stack mt={3} space={4} w="75%" maxW="300px">
        <Center mt={20} mb={20}>
          <Image source={ReferenceImage} />
        </Center>
        <Form />
        <Box>
          <Link to={{ screen: screens.PASSWORD_RECOVERY }} style={{textAlign: "center", fontSize: 13}}>
            Did you forget your password?
          </Link>
        </Box>
      </Stack>
    </Center>
  );
}

  