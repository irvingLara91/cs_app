import React, {useEffect, useState} from "react";
import { TouchableHighlight,View, Dimensions } from "react-native";
import { Box, Center, Text, Button, Image, Flex, Heading } from "native-base";
import Steps from "./Steps";
import Camera from "~/components/common/Camera";
import screens from "~/constants/screens";
import HelperImage from "~/assets/image.png";
import { useNewOrderContext } from "~/context/newOrder";
import {LinearGradient} from "expo-linear-gradient";

const { height } = Dimensions.get("window");
import * as Location from 'expo-location';
import {isNumber} from "~/utils/utils";
const GravestoneStep = ({ navigation }) => {
	const { setOrderData } = useNewOrderContext();
	const { navigate } = navigation;
	const [enableCamera, setEnableCamera] = useState(false);

	const [location, setLocation] = useState(null);
	const [address_, setAddress] = useState(null);

	const [errorMsg, setErrorMsg] = useState(null);

	const getAddressPoint = async (location) => {
		const place = await Location.reverseGeocodeAsync({
			latitude: location.latitude,
			longitude: location.longitude
		});
		let address_struct = "";
		if (place && place.length > 0) {
			address_struct = `${place[0].street ? place[0]?.street : ""}${place[0].streetNumber?" "+place[0].streetNumber:""},${place[0].district?place[0].district:""},${place[0].city?place[0].city:""},${place[0].region?place[0].region:""},${place[0].country?place[0].country:""},${place[0].postalCode?place[0].postalCode:""}`
		}

		//console.log(address_struct)
		setAddress(address_struct)
	};


	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}
			let location_ = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Lowest});
			setLocation(location_);
			await getAddressPoint(location_.coords)
		})();
	}, []);


	const handleConfirmation = (picture) => {
		if (!address_){
			return false
		}
		const addressState = address_;
		const addressSplitted = errorMsg ? "" : addressState ?  addressState.split(",") : "";
		const address = errorMsg ? "" : addressSplitted[0] ? addressSplitted[0] : "";
		const address2 = errorMsg ? "" : addressSplitted[1]? addressSplitted[1]: "";
		const city = errorMsg ? "" : addressSplitted[2] ? addressSplitted[2]: "";
		const zipCode = errorMsg ? "" : addressSplitted[addressSplitted.length - 1];
		setOrderData((prevState) => {
			return {
				...prevState,
				gravestone: {
					...prevState.gravestone,
					image: picture,
					address: {
						address,
						address2,
						city,
						zipCode:errorMsg ? "" : isNumber(zipCode) ? zipCode : "",
						latitude:errorMsg ? "" : location.coords.latitude,
						longitude:errorMsg ? "" :location.coords.longitude
					}
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
