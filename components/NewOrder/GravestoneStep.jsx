import React, { useState } from "react";
import { TouchableHighlight, Dimensions } from "react-native";
import { Box, Center, Text, Button, Image, Flex, Heading } from "native-base";
import Steps from "./Steps";
import Camera from "~/components/common/Camera";
import screens from "~/constants/screens";
import HelperImage from "~/assets/image.png";
import { useNewOrderContext } from "~/context/newOrder";

const { height } = Dimensions.get("window");

const GravestoneStep = ({ navigation }) => {
	const { setOrderData } = useNewOrderContext();
	const { navigate } = navigation;
	const [enableCamera, setEnableCamera] = useState(false);
	
	const handleConfirmation = (picture) => {
		setOrderData((prevState) => {
			return {
				...prevState,
				gravestone: {
					...prevState.gravestone,
					image: picture,
				}
			}
		})
		navigate(screens.NEW_ORDER_STEP_3)
	}

	return (
		<Center bg="black" height={!enableCamera ? height : null}>
			{
				!enableCamera ? 
					<Unboarding setEnableCamera={() => setEnableCamera(true)} /> : 
					<Box alignItems="center">
						<Steps />
						<Camera onConfirm={handleConfirmation}/>
					</Box>
			}
		</Center>
	);
};

export default GravestoneStep;

const Unboarding = ({ setEnableCamera }) => {
	return (
		<Center bg="white" borderRadius="20">
			<Box p="15" w="full" maxW={270}>
				<Center>
					<Image mb="30" mt="30" source={HelperImage} width="63" height="50" alt="gravestone picture unboarding" />
					<Heading style={{textAlign: "center"}} >Gravestone picture</Heading>
					<Text fontSize="10" mt="3" style={{textAlign: "center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.</Text>
					<Box w="full" mt="5" mb="5">
						<Button bgColor="dark.50" borderRadius="none" onPress={() => setEnableCamera(true)} >Continue</Button>
					</Box>
					<TouchableHighlight onPress={() => console.log("navigate(currentStep.data.help)")}>
						<Text fontSize="11" mb="10" underline>Need help?</Text>
					</TouchableHighlight>
				</Center>
			</Box>
		</Center>
	);
};
