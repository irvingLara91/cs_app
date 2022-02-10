import { StyleSheet, Dimensions } from "react-native";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH  / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH);

const styles = StyleSheet.create({
	dots: {
		width: 5,
		height: 5,
		borderRadius: 5,
		marginHorizontal: 8,
		backgroundColor: "#cccccc",
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


export default styles;

