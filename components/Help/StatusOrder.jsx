import React from "react";
import { Dimensions } from "react-native";
import { Stack, Center, Text, Heading, Button, Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

import Header from "../Header";

const StatusOrden = () => {
	const navigation = useNavigation();
	return (
		<Stack w="full" h={"full"} backgroundColor={"#FFFFFF"}>
			<Center>
				<Heading
					pt={2}
					fontFamily={"Roboto_700Bold"}
					size="xl"
					textAlign={"center"}
				>
          See status of my order ?
				</Heading>
				<Text pt={2} textAlign={"center"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
          consectetur amet tellus lobortis diam sed.
				</Text>
				<Box pt={10}>
					<Button onPress={() => navigation.navigate({ name: "Orders" })} w={width / 1.5}>
            View Orders
					</Button>
				</Box>
			</Center>
		</Stack>
	);
};

export default StatusOrden;
