import React from "react";
import { Stack, Center, Text, Heading, Image } from "native-base";
import GroupCards from "~/assets/group-card.png";

import Header from "../Header";

const PaymentMethods = () => {
	return (
		<Stack w="full" h={"full"} backgroundColor={"#FFFFFF"}>
			<Center>
				<Heading
					pt={2}
					fontFamily={"Roboto_700Bold"}
					size="xl"
					textAlign={"center"}
				>
          Payment methods
				</Heading>
				<Text pt={2} textAlign={"center"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
          consectetur amet tellus lobortis diam sed.
				</Text>

				<Center pt={10}>
					<Image source={GroupCards} alt="reference login image" />
				</Center>				
			</Center>
		</Stack>
	);
};

export default PaymentMethods;
