import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

module.exports = StyleSheet.create({
	video: {
		alignSelf: "center",
		width: width / 1.1,
		height: 200,
	},
});