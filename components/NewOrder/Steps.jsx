import React, { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Heading, Text, Center } from "native-base";

import { getStepData } from "./helpers";
import { useNewOrderContext } from "~/context/newOrder";

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
				<Text color={currentStep.color} fontSize="20" >{currentStep.step}/{totalSteps}</Text>
				<Heading color={currentStep.color} fontWeight="bold" fontSize="18" >{currentStep.data.title}</Heading>
				<Text color={currentStep.color} fontSize="10">{currentStep.data.description}</Text>
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