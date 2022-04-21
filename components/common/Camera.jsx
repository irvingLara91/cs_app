import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform, Dimensions, Image } from "react-native";
import { Camera as ExpoCamera } from "expo-camera";
import { IconButton, Center, Box, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import {useIsFocused} from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export default function Camera({ onConfirm }) {
	const isFocused = useIsFocused();

	const [camera, setCamera] = useState(null);
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [imagePadding, setImagePadding] = useState(0);
	const [ratio, setRatio] = useState("4:3");
	const screenRatio = height / width;
	const [isRatioSet, setIsRatioSet] =  useState(false);
	const [picture, setPicture] = useState(null);

	const styles = StyleSheet.create({
		information: { 
			flex: 1,
			justifyContent: "center",
			alignContent: "center",
			alignItems: "center",
		},
		container: {
			flex: 1,
			backgroundColor:"#000"
		},
		cameraView: {
			flex: Platform.OS==="ios"? .9 : 1,
			width,
			height
		},
		expoCamera: {
			marginTop: imagePadding, marginBottom: imagePadding
		}
	});


	useEffect(() => {
		async function getCameraStatus() {
			const { status } = await ExpoCamera.requestCameraPermissionsAsync();
			setHasCameraPermission(status == "granted");
		}    
		getCameraStatus();
	}, []);

	useEffect(()=>{
		if (isFocused){
			setPicture(null)
		}
	},[isFocused])

	const prepareRatio = async () => {
		let desiredRatio = "4:3";
		if (Platform.OS === "android") {
			const ratios = await camera.getSupportedRatiosAsync();
			let distances = {};
			let realRatios = {};
			let minDistance = null;
			for (const ratio of ratios) {
				const parts = ratio.split(":");
				const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
				realRatios[ratio] = realRatio;
				const distance = screenRatio - realRatio; 
				distances[ratio] = realRatio;
				if (minDistance == null) {
					minDistance = ratio;
				} else {
					if (distance >= 0 && distance < distances[minDistance]) {
						minDistance = ratio;
					}
				}
			}
			desiredRatio = minDistance;
			const remainder = Math.floor(
				(height - realRatios[desiredRatio] * width) / 2
			);
			setImagePadding(remainder);
			setRatio(desiredRatio);
			setIsRatioSet(true);
		}

	};

	const setCameraReady = async() => {
		if (!isRatioSet) {
			await prepareRatio();
		}
	};

	const takePicture = async() => {
		if (camera) {
			const options = {quality: 0.5};
			const photo = await camera.takePictureAsync(options);
			setPicture(photo);
		}
	};

	if (hasCameraPermission === null) {
		return <View />;
	}
	if (hasCameraPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const cancelPicture = () => setPicture(null);
  
	return (
		<View style={styles.container}>
			{
				picture ? (
					<View style={[styles.cameraView, {marginTop: imagePadding, marginBottom: imagePadding}]}>
						<Image source={{uri: picture.uri}} style={{flex:1, width, height }} />
						<Center>
							<Center direction="row" style={{
								overFlow: "red",position: "absolute", display:"flex", width: "100%", height: 165, textAlign: "center", marginBottom: imagePadding, alignItems: "center", flexDirection: "row"}}>
								<TouchableOpacity onPress={cancelPicture} style={{
									width:"35%",
									backgroundColor: '#E0E0E0',padding:20,borderBottomLeftRadius:10,borderTopLeftRadius:10}}>
									<Text style={{textAlign:'center',fontFamily: "Roboto_700Bold"}}>Back</Text>
								</TouchableOpacity>


								<TouchableOpacity  onPress={() => onConfirm(picture)} style={{
									width:"35%",
									backgroundColor: '#858C93',padding:20,borderBottomRightRadius:10,borderTopRightRadius:10}}>
									<Text style={{textAlign:'center',fontFamily: "Roboto_700Bold"}}>Accept</Text>
								</TouchableOpacity>
							</Center>
						</Center>
					</View>
				) : (
					<Box>
						<ExpoCamera
							style={[styles.cameraView, styles.expoCamera]}
							onCameraReady={setCameraReady}
							ratio={ratio}
							ref={(ref) => {
								setCamera(ref);
							}} />
						<Center>
							<View style={{position: "absolute", bottom: imagePadding, }}>
								<IconButton onPress={() => takePicture()} borderRadius="full" variant="ghost" _icon={{
									as: MaterialIcons,
									name: "radio-button-unchecked",
									color: "white",
									size: 16
								}} />
							</View>
						</Center>
					</Box>
				)
			} 
		</View>
	);
}
