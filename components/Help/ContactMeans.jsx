import React from "react";
import { Stack, Center, Text, Heading, Icon, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import Header from "../Header";

const ContactMeans = () => {
	return (
		<Stack w="full" h={"full"} backgroundColor={"#FFFFFF"}>
			<Center>
				<Header screenName={"Help"} />
				<Heading
					pt={2}
					fontFamily={"Roboto_700Bold"}
					size="xl"
					textAlign={"center"}
				>
          Contact means
				</Heading>
				<Text pt={2} textAlign={"center"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
          consectetur amet tellus lobortis diam sed.
				</Text>

				<Center pt={10}>
					<HStack p={2}>
						<Icon as={MaterialIcons} name="phone" size={26} />
						<Text> +052 57842 2569883</Text>
					</HStack>
					<HStack p={2}>
						<Icon as={MaterialIcons} name="email" size={26} />
						<Text> faqs@cornerstone.com</Text>
					</HStack>
					<HStack p={2}>
						<Icon as={MaterialIcons} name="access-time" size={26} />
						<Text> Monday to Friday : 10:00 to 16:00</Text>
					</HStack>
				</Center>
			</Center>
		</Stack>
	);
};

export default ContactMeans;
