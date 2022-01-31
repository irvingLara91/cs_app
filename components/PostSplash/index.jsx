import { View, Center, Stack, Text, Box, Button} from "native-base";
import screens from "~/constants/screens";

const PostSplash = ({navigation}) => {
  return (
    <Center>
      <Stack mt={3} space={4} w="75%" maxW="300px">
        <View><Text>Carousel here</Text></View>
        <Box>
          <Button onPress={() => navigation.navigate(screens.LOGIN)}>Login</Button>
        </Box>
        <Box>
          <Button onPress={() => navigation.navigate(screens.REGISTER)}>Register</Button>
        </Box>
      </Stack>
    </Center>
  );
}

export default PostSplash