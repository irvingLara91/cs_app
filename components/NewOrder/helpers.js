export const getStep = (route) => {
	let color = "white";
	const splitted = route.split("");
	const length = splitted.length;
	const number = Number(splitted[length - 1]);

	const step = {
		step: number,
		color
	};
	if (number > 2) {
		step.color = "black";
	}

	return step;
};