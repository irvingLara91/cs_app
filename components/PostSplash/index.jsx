import React from "react";
import { Link } from "@react-navigation/native";
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
				<Box mt={3}>
					<Center>
						<Text fontSize={13}>
              You are a cornernstone technician? <Link to={{ screen: screens.LOGIN }} >Log in</Link>
						</Text>
					</Center>
				</Box>
			</Stack>
		</Center>
	);
};

export default PostSplash;