import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
	flexSpaceBetween: {
		display: "flex", 
		width: "100%", 
		flexDirection: "row", 
		justifyContent: "space-between"
	},
	textInput:{
		backgroundColor: 'white',
		borderColor: '#C4C4C4',
		borderWidth:.5,
		height: 40,
		padding: 10,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0, height: 4,
		},
		shadowOpacity: 0.30,
		shadowRadius: 2.65,
		elevation: 8,
	}
});