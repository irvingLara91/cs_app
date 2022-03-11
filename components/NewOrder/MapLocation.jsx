import React, {useEffect, useRef, useState} from "react";
import {
	View,
	Dimensions,
	ActivityIndicator,
	TouchableOpacity
} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons";
import {Button, Text} from "native-base";

const MapLocation = (props) => {
	const ref = useRef();

	useEffect(() => {
		ref.current?.setAddressText("Some Text");
	}, []);
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [screen, setScreen] = useState(null);
	const [hasPermission, setHastPermission] = useState(null);


	useEffect(() => {
		let screen = props.route.params.screen;
		setScreen(screen);
	}, [hasPermission]);


	const _saveLocationAddress = async () => {
		props.navigation.navigate(screen, {
			location: {points: location, address: address},
			forceUpdate: !props.route.params.forceUpdate
		});
	};


	const valData = (data, type = null) => {
		let res = "";
		if (data && type) {
			res = data + "";
		} else if (data) {
			res = data + ",";
		}
		return res;
	};

	const getAddressPoint = async (location) => {
		const place = await Location.reverseGeocodeAsync({
			latitude: location.latitude,
			longitude: location.longitude
		});
		let address_struct = "";
		if (place && place.length > 0) {
			// address_struct = `${valData(place[0].street)} ${valData(place[0].streetNumber)} ${valData(place[0].district)} ${valData(place[0].city)} ${valData(place[0].region)} ${valData(place[0].country, "end")}`;
			address_struct = `${place[0].street} ${place[0].streetNumber},${place[0].district}, ${place[0].city},${place[0].region},${place[0].country},${place[0].postalCode}`
		}
		ref.current?.setAddressText(address_struct);
		await setAddress(address_struct);
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			let {status} = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				setLoading(false);
				return;
			}
			setHastPermission(status);
			let location_ = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Lowest});
			await getAddressPoint(location_.coords);
			setLocation(location_.coords);
			setLoading(false);
		})();
	}, []);

	const newPosition = async (data) => {
		let location_ = data.nativeEvent.coordinate;
		await getAddressPoint(location_);
		setLocation(location_);
	};
	if (!loading && location) {
		return (
			<View style={{flex: 1}}>
				<View style={{
					width: "100%",
					position: "absolute",
					zIndex: 1,
					paddingTop: 10,
					paddingHorizontal: 10,
				}}>
					<GooglePlacesAutocomplete
						styles={{
							textInput: {
								borderTopLeftRadius: 10,
								borderBottomLeftRadius: 10,
								borderRadius: 0,
								height: "100%",
								color: "#5d5d5d",
								fontSize: 16,
							},
							predefinedPlacesDescription: {
								color: "#1faadb",
							},
						}}
						renderRightButton={() => (
							<TouchableOpacity
								style={{
									borderTopRightRadius: 10,
									borderBottomRightRadius: 10,
									backgroundColor: "white", paddingHorizontal: 20, justifyContent: "center"
								}}
								onPress={() => {
									ref.current?.clear();
								}}
							>
								<AntDesign name="closecircleo" size={10} color="black"/>
							</TouchableOpacity>
						)}
						ref={ref}
						placeholder="Search"
						onPress={(data, details = null) => {
							Location.setGoogleApiKey("AIzaSyA1ERydeka8BDf6f-Gz6P1hQxdN095LiXo");
							Location.geocodeAsync(data.description, {useGoogleMaps: true}).then(response => {
									setLocation(response[0]);
									setAddress(data.description);
								}
							);
						}}
						query={{
							key: "AIzaSyA1ERydeka8BDf6f-Gz6P1hQxdN095LiXo",
							language: "es",
						}}
					/>
				</View>
				<MapView
					onPress={newPosition}
					style={{
						flex: 1,
						height: Dimensions.get("window").height / 2,
						width: Dimensions.get("window").width,
					}}
					loadingEnabled={true}
					region={{
						latitude: location.latitude,
						longitude: location.longitude,
						latitudeDelta: 0.023,
						longitudeDelta: 0.023,
					}}
				>
					<Marker
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude,
							latitudeDelta: 0.023,
							longitudeDelta: 0.023,
						}}
					>
						<View>
							<MaterialCommunityIcons
								name="map-marker"
								size={40}
								color={"black"}
							/>
						</View>
					</Marker>

				</MapView>
				<View style={{
					width: "100%",
					position: "absolute",
					zIndex: 1,
					bottom: 0,
					paddingTop: 10,
					paddingBottom: 20,
					flexDirection: "row",
					paddingHorizontal: 10,
				}}>
					<Button bgColor="dark.50" size="lg" style={{width: "100%", flex: 1, marginRight: 10}}
							onPress={() => props.navigation.goBack()}
					>
						Back
					</Button>
					<Button
						onPress={() => {
							if (location && address) {
								_saveLocationAddress();
							}
						}}
						bgColor="dark.50" size="lg" style={{width: "100%", flex: 1, marginLeft: 10}}>
						Accept
					</Button>
				</View>
			</View>
		);
	} else {
		return (
			<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
				<Text style={{fontSize: 18, fontFamily: "Roboto_100Thin"}}>Loading...</Text>
				<ActivityIndicator size="large" color={"black"}/>
			</View>);

	}
};

export default MapLocation;