import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {TouchableOpacity,View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";

import {
	Box,
	VStack,
	Input,
	Button,
	FormControl,
	TextArea,
	Text
} from "native-base";
import Steps from "./Steps";
import screens from "~/constants/screens";
import ContainerBaseV2 from "~/components/common/ContainerBaseV2";
import MapView from "react-native-maps";
import {MaterialCommunityIcons} from "@expo/vector-icons";


const DetailsStep = () => {
	return (
		<ContainerBaseV2>
			<Box alignItems="center">
				<Steps/>
				<Form/>
			</Box>
		</ContainerBaseV2>
	);
};


const Location = () => {
	const {navigate} = useNavigation();
	return (
		<TouchableOpacity onPress={() => navigate(screens.NEW_ORDER_STEP_3_MAP, {screen: screens.NEW_ORDER_STEP_3})}>
			<Text mr="2" fontSize="11" underline>Locate in the map</Text>
		</TouchableOpacity>
	);
};


const Form = () => {
	const {location} = useRoute().params ?? {};
	const {control, setValue, handleSubmit, formState: {errors}} = useForm();
	const [location_map, setLocation_map] = useState(null);
	const {navigate} = useNavigation();
	useEffect(() => {
		let locationVar = location;
		setLocation_map(null)
		if (locationVar) {
			setLocation_map(locationVar);
			setValue("address", locationVar.address);
		}
	}, [location]);


	const onSubmit = (data) => {
		console.log({data});
		navigate(screens.NEW_ORDER_STEP_4);
	};
	return (
		<VStack w="full" maxW={280} mt="30" mb={30} space={3} alignItems="center">
			<FormControl isRequired isInvalid={"gravestoneText" in errors}>
				<FormControl.Label>Gravestone text</FormControl.Label>
				<Controller
					control={control}
					render={({field: {onChange, onBlur, value}}) => (
						<Input
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
						/>
					)}
					name="gravestoneText"
					rules={{required: "Field is required", minLength: 3}}
					defaultValue=""
				/>
				<FormControl.ErrorMessage>
					{errors?.gravestoneText?.message}
				</FormControl.ErrorMessage>
			</FormControl>
			<FormControl isRequired isInvalid={"additionalInformation" in errors}>
				<FormControl.Label>Additional information</FormControl.Label>
				<Controller
					control={control}
					render={({field: {onChange, onBlur, value}}) => (
						<TextArea
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
						/>
					)}
					name="additionalInformation"
					rules={{required: "Field is required", minLength: 3}}
					defaultValue=""
				/>
				<FormControl.ErrorMessage>
					{errors?.additionalInformation?.message}
				</FormControl.ErrorMessage>
			</FormControl>
			<FormControl isRequired isInvalid={"address" in errors}>
				<FormControl.Label>Address</FormControl.Label>
				{
					location_map &&
					<View style={{marginVertical: 8}}>
						<MapView
							minZoomLevel={2}  // default => 0
							maxZoomLevel={20}
							style={{width: '100%', height: 150, marginBottom: 32, borderRadius: 9}}
							initialRegion={{
								latitude: location_map.points.latitude,
								longitude: location_map.points.longitude,
								latitudeDelta: 0.023,
								longitudeDelta: 0.023,
							}}
							scrollEnabled={true}
							rotateEnabled={true}
							zoomEnabled={true}
						>
							<MapView.Marker
								coordinate={{
									latitude: location_map.points.latitude,
									longitude: location_map.points.longitude,
									latitudeDelta: 0.023,
									longitudeDelta: 0.023,
								}}>
								<MaterialCommunityIcons name="map-marker" size={30}
														color={'black'}
														style={{marginBottom: 8}}/>
							</MapView.Marker>
						</MapView>
					</View>
				}
				<Controller
					control={control}
					render={({field: {onChange, onBlur, value}}) => (
						<Input
							name={"address"}
							InputRightElement={<Location/>}
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
						/>
					)}
					name="address"
					rules={{required: "Field is required", minLength: 3}}
					defaultValue=""
				/>
				<FormControl.ErrorMessage>
					{errors?.address?.message}
				</FormControl.ErrorMessage>
			</FormControl>
			<Button borderRadius="none" bgColor="dark.50" onPress={handleSubmit(onSubmit)} size="lg"
					style={{width: "100%"}}>
				Continue
			</Button>
		</VStack>
	);
};


export default DetailsStep;