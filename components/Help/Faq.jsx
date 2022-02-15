import React from "react";
import HowCardPhoto from "./HowCardPhoto";
import HowGravestonePhoto from "./HowGravestonePhoto";
import StatusOrden from "./StatusOrder";
import PaymentMethods from "./PaymentMethods";
import ContactMeans from "./ContactMeans";

const Faq = ({ route }) => {
	const {params} = route;
	return (
		<>		
			{params.question === "HowCardPhoto" && <HowCardPhoto />}
			{params.question === "HowGravestonePhoto" && <HowGravestonePhoto />}
			{params.question === "StatusOrden" && <StatusOrden />}
			{params.question === "PaymentMethods" && <PaymentMethods />}
			{params.question === "ContactMeans" && <ContactMeans />}
		</>
	);
};

export default Faq;
