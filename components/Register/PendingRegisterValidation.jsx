import React from "react";
import {
	Image,
	Center,
	Stack,
	Box,
	View,
	Heading,
	Text,
	Button,
} from "native-base";
import screens from "~/constants/screens";
import pendingValidationImage from "~/assets/pending-register.png";
import Header from "../Header";
import {useAuthUserContext} from "~/context/authUser";

const PendingRegisterValidation = ({ navigation,route}) => {
	const {params} = route;
	const {RegisterUser} = useAuthUserContext()

	const registerUserData = async (params) => {
		let data ={};
		data.fullName= params.fullName;
		data.email= params.email;
		data.phone= params.phone;
		data.address= params.address;
		data.city= params.city;
		data.zipCode= params.zipCode;
		data.LoggedIn = true;
		data.isFirstTime = true;
		await RegisterUser(data)

	}
	return (
		<Center>
			<Header screenName={ "POST_SPLASH"} />
			<Stack mt={3} space={4} w="75%" maxW="300px">
				<Center mt={20} mb={20}>
					<Image source={pendingValidationImage} alt="pending validation" />
				</Center>
				<View>
					<Heading>Thanks for signing up</Heading>
					<Text>
            Your account is pending validation, we will contact you soon
					</Text>
				</View>
				<Box mt={3}>
					<Button
						bgColor="primary_black.900" borderRadius={0}
						size="lg"
						onPress={() =>
						{
							registerUserData(params)
						}
							/*navigation.navigate({
								name: screens.HOME,
								params: { isFirstTime: true },
							})*/
						}
					>
            Continue
					</Button>
				</Box>
			</Stack>
		</Center>
	);
};

export default PendingRegisterValidation;
