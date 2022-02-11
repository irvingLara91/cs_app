import React from "react";
import { Box, Center } from "native-base";
import Steps from "./Steps";

import screens from "~/constants/screens";
import Camera from "~/components/common/Camera";

const CardStep = ({navigation}) => {
	const { navigate } = navigation;
	return (
		<Center bg="black">
			<Box alignItems="center">
				<Steps />
				<Camera onConfirm={() => navigate(screens.NEW_ORDER_STEP_2)}/>
			</Box>
		</Center>
	);
};

export default CardStep;