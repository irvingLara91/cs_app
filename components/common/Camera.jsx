import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform, Dimensions, Image } from "react-native";
import { Camera as ExpoCamera } from "expo-camera";
import { IconButton, Center, Box, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

export default function Camera({ onConfirm }) {
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
			const photo = await camera.takePictureAsync();
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
							<Center direction="row" style={{overFlow: "hidden",position: "absolute", display:"flex", width: "100%", height: 165, textAlign: "center", marginBottom: imagePadding, alignItems: "center", flexDirection: "row"}}>
								<Button _text={{fontWeight: "bold"}} size="1/3" bg="white" mr="1" onPress={cancelPicture}>
                  Back
								</Button>
								<Button _text={{fontWeight: "bold"}} size="1/3" bg="white" onPress={onConfirm}>
                  Accept
								</Button>
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
