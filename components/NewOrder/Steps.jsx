import React, { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Heading, Text, Center } from "native-base";

import { getStepData } from "./helpers";
import { useNewOrderContext } from "~/context/newOrder";
import {textSizeRender} from "~/utils/utils";

const Steps = () => {
	const { navigate } = useNavigation();
	const { totalSteps } = useNewOrderContext();
	const { name } = useRoute();
	const [currentStep, setCurrentStep] = useState(getStepData(name));

	useEffect(() => {
		setCurrentStep(getStepData(name));
	}, [name]);

	return (
		<Center pt="10">
			<Center maxW="250">
				<Text fontFamily={"Roboto_700Bold"} color={currentStep.color} fontSize={textSizeRender(5)} >{currentStep.step}/{totalSteps}</Text>
				<Heading fontFamily={"Roboto_700Bold"} color={currentStep.color} fontSize={textSizeRender(5.5)}>{currentStep.data.title}</Heading>
				<Text fontFamily={"Roboto_400Regular"} color={currentStep.color} fontSize={textSizeRender(2.8)}>{currentStep.data.description}</Text>
				{
					currentStep.data.help !== null && (
						<TouchableHighlight onPress={() => console.log("navigate(currentStep.data.help)")}>
							<Text mt="3" fontSize="11" color={currentStep.color} underline>Need help?</Text>
						</TouchableHighlight>
					)
				}
			</Center>
		</Center>
	);
};

export default Steps;