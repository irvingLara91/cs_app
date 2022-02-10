import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Heading, Text, Center, Box } from "native-base";
import { getStep } from "./helpers";
import { useNewOrderContext } from "~/context/newOrder";

const Steps = () => {
	const { totalSteps } = useNewOrderContext();
	const { name } = useRoute();
	const [currentStep, setCurrentStep] = useState(getStep(name));
	const [info, setInfo] = useState({title: "", description: ""});


	useEffect(() => {
		setCurrentStep(getStep(name));
	}, [name]);

	useEffect(() => {
		let data = {};
		switch (currentStep.step) {
		case 1: {
			data = {
				title: "Credit card picture",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed."
			};
			break;
		}
		case 2: {
			data = {
				title: "Gravestone picture",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed."
			};
			break;
		}
		case 3: {
			data = {
				title: "Order details",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed."
			};
			break;
		}
		case 4: {
			data = {
				title: "Confirm order",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed."
			};
			break;
		}

		default: data = {};
		}
		setInfo(data);

	}, [currentStep]);


	return (
		<Center>
			<Box>
				<Text color={currentStep.color}>{currentStep.step} / {totalSteps}</Text>
				<Heading color={currentStep.color}>{info.title}</Heading>
				<Text color={currentStep.color}>{info.description}</Text>
			</Box>
		</Center>
	);
};

export default Steps;