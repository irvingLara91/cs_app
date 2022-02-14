import React from "react";
import HowCardPhoto from "./HowCardPhoto";
import HowGravestonePhoto from "./HowGravestonePhoto";
import StatusOrden from "./StatusOrder";

const Faq = ({ route }) => {
	const {params} = route;
	return (
		<>		
			{params.question === "HowCardPhoto" && <HowCardPhoto />}
			{params.question === "HowGravestonePhoto" && <HowGravestonePhoto />}
			{params.question === "StatusOrden" && <StatusOrden />}
		</>
	);
};

export default Faq;
