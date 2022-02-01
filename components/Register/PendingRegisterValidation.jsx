import React from "react";
import { Image, Center, Stack, Box, View, Heading, Text, Button } from "native-base";
import screens from "~/constants/screens";
import pendingValidationImage from "~/assets/pending-register.png";


const PendingRegisterValidation = ({navigation}) => {
	return (
		<Center>
			<Stack mt={3} space={4} w="75%" maxW="300px">
				<Center mt={20} mb={20}>
					<Image source={pendingValidationImage} alt="pending validation"/>
				</Center>
				<View>
					<Heading>Thanks for signing up</Heading>
					<Text>
            Your account is pending validation, we will contact you soon
					</Text>
				</View>
				<Box mt={3}>
					<Button onPress={() => navigation.navigate({name: screens.HOME, params: { isFirstTime: true }})}>
							Continue
					</Button>
				</Box>
			</Stack>
		</Center>
	);
};

export default PendingRegisterValidation;