
import { StyleSheet, Dimensions } from "react-native";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH  / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH);

module.exports = StyleSheet.create({
	dots: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 8,
		backgroundColor: "rgba(204, 51, 44, 0.92)",
	},
	itemContainer: {  
		width: ITEM_WIDTH,
		height: ITEM_HEIGHT,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#C4C4C4",
		padding: 10,
        
	},

});