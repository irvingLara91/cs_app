import screens from "~/constants/screens";

export const getStepData = (route) => {
	const splitted = route.split("");
	const length = splitted.length;
	const step = Number(splitted[length - 1]);

	const stepData = {
		step,
		color: "white",
	};

	if (step > 2) {
		stepData.color = "black";
	}

	switch (step) {
	case 1: {
		stepData.data = {
			title: "Credit card picture",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
			help: screens.HOME
		};
		break;
	}
	case 2: {
		stepData.data = {
			title: "Gravestone picture",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
			help: screens.HOME
		};
		break;
	}
	case 3: {
		stepData.data = {
			title: "Order details",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
			help: null
		};
		break;
	}
	case 4: {
		stepData.data = {
			title: "Confirm order",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
			help: null
		};
		break;
	}
	default: stepData.data = { title: "", description: "", help: null };
	}

	return stepData;
};
