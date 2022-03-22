import React, { useState } from "react";
import { TouchableHighlight,View, Dimensions } from "react-native";
import { Box, Center, Text, Button, Image, Flex, Heading } from "native-base";
import Steps from "./Steps";
import Camera from "~/components/common/Camera";
import screens from "~/constants/screens";
import HelperImage from "~/assets/image.png";
import { useNewOrderContext } from "~/context/newOrder";
import {LinearGradient} from "expo-linear-gradient";

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
		<Center bg="black" height={!enableCamera ? '100%' : null}>
			{
				!enableCamera ?
					<View style={{height:'100%',justifyContent:'center'}}>
						<Unboarding setEnableCamera={() => setEnableCamera(true)} />
					</View>
					:
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
		<LinearGradient colors={["#858C93","#5E6268"]} style={{borderRadius:31}}>
			<Box p="15" w="full" maxW={270}>
				<Center>
					<Image mb="30" mt="30" tintColor={"white"} source={HelperImage} width="63" height="50" alt="gravestone picture unboarding" />
					<Heading style={{ fontFamily:"Roboto_500Medium",textAlign: "center",color:"white"}} >Gravestone picture</Heading>
					<Text fontSize="10" mt="3" style={{fontFamily:"Roboto_400Regular",textAlign: "center",color:"white"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.</Text>
					<Box w="full" mt="5" mb="5">
						<Button bgColor={"primary_white.50"}  _text={{}} borderRadius="10" onPress={() => setEnableCamera(true)} >
							<Text fontFamily={"Roboto_400Regular"}>Continue</Text>
						</Button>
					</Box>
					<TouchableHighlight onPress={() => console.log("navigate(currentStep.data.help)")}>
						<Text color={"white"} fontSize="11" mb="10" underline>Need help?</Text>
					</TouchableHighlight>
				</Center>
			</Box>
		</LinearGradient>
	);
};
