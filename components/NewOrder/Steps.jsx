import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Text } from "native-base";
import { getStep } from "./helpers";
import { useNewOrderContext } from "~/context/newOrder";

const Steps = () => {
	const { totalSteps } = useNewOrderContext();
	const { name } = useRoute();
	const [currentStep, setCurrentStep] = useState(getStep(name));


	useEffect(() => {
		setCurrentStep(getStep(name));
	}, [name]);


	return (
		<Text color={currentStep.color}>{currentStep.step} / {totalSteps}</Text>
	);
};

export default Steps;