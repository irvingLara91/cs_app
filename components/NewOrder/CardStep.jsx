import React from "react";
import { Box, Center } from "native-base";
import Steps from "./Steps";

import screens from "~/constants/screens";
import Camera from "~/components/common/Camera";

import { useNewOrderContext } from "~/context/newOrder";

const CardStep = ({navigation}) => {
	const { setOrderData } = useNewOrderContext();
	const handleConfirmation = (picture) => {
		setOrderData((prevState) => {
			return {
				...prevState,
				card: picture
			}
		})
		navigate(screens.NEW_ORDER_STEP_2)
	}
	const { navigate } = navigation;
	return (
		<Center bg="black">
			<Box alignItems="center">
				<Steps />
				<Camera onConfirm={handleConfirmation}/>
			</Box>
		</Center>
	);
};

export default CardStep;
