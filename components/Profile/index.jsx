import React from "react";
import {ScrollView} from "react-native";
import {Stack, Box, Image, Center, Divider, Text} from "native-base";
import Form from "./Form";
import gravestoneMedia from "~/assets/gravestone-media.png";
import ContainerBaseV2 from "~/components/common/ContainerBaseV2";

const Profile = () => {
	return (
		<ContainerBaseV2>
			<ScrollView>
				<Center mt={5} mb={5}>
					<Stack w="full" maxW="300">
						<Center mt="5">
							<Box bgColor="muted.300" pt="7" pb="7" pl="7" pr="7" borderRadius="lg">
								<Image source={gravestoneMedia} alt="gravestone picture"/>
							</Box>
							<Text fontSize={20}>
								Oscar Fuentes
							</Text>
						</Center>
						<Divider mt="5" mb="5"/>
						<Box>
							<Form/>
						</Box>
					</Stack>
				</Center>
			</ScrollView>
		</ContainerBaseV2>
	);
};

export default Profile;

