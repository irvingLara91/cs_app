import React from "react";
import { Text, Box, Center, Button } from "native-base";
import Steps from "./Steps";

import screens from "~/constants/screens";

const CardStep = ({navigation}) => {
	const { navigate } = navigation;
	return (
		<Center>
			<Box alignItems="center">
				<Steps />
				<Text>Card Step</Text>
				<Button onPress={() => navigate(screens.NEW_ORDER_STEP_2)}>Next</Button>
			</Box>
		</Center>
	);
};

export default CardStep;