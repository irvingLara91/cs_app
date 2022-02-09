import React from "react";
import { Box, Center, Text, Button } from "native-base";
import Steps from "./Steps";
import screens from "~/constants/screens";


const DetailsStep = ({ navigation }) => {
	const { navigate } = navigation;
	return (
		<Center>
			<Box alignItems="center">
				<Steps />
				<Text> Details step </Text>
				<Button onPress={() => navigate(screens.NEW_ORDER_STEP_4)} >Next</Button>
			</Box>
		</Center>
	);
};

export default DetailsStep;