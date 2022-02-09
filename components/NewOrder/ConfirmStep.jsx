import React from "react";
import { Text, Box, Center, Button } from "native-base";
import Steps from "./Steps";

import screens from "~/constants/screens";

const ConfirmStep = ({ navigation }) => {
	const { navigate } = navigation;
	return (
		<Center>
			<Box>
				<Steps />
				<Text>Confirm step jsx</Text>
				<Button onPress={() => navigate(screens.NEW_ORDER_PLACED)} >Confirm order</Button>
			</Box>
		</Center>
	);
};

export default ConfirmStep;