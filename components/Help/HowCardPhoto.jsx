import React from "react";
import { Stack, Image, Center, Text, Heading, Box } from "native-base";
import { Video } from "expo-av";

import Header from "../Header";
import styles from "./styles";
import ReferenceImage from "~/assets/image.png";

const HowCardPhoto = () => {
	const video = React.useRef(null);
	const [status, setStatus] = React.useState({});
	return (
		<Stack w="full" h={"full"} backgroundColor={"#FFFFFF"}>
			<Center>
				<Heading pt={2} fontFamily={"Roboto_700Bold"} size="xl" textAlign={"center"}>
          How to take a credit card photo?
				</Heading>
				<Text pt={2} textAlign={"center"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
          consectetur amet tellus lobortis diam sed.
				</Text>
				<Center>
					<Image source={ReferenceImage} alt="reference login image" />
				</Center>
				<Text pt={2} textAlign={"center"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
          consectetur amet tellus lobortis diam sed.
				</Text>
				<Center>
					<Image source={ReferenceImage} alt="reference login image" />
				</Center>
			</Center>

			<Box pt={5}>
				<Video
					ref={video}
					style={styles.video}
					source={{
						uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
					}}
					useNativeControls
					resizeMode="contain"
					onPlaybackStatusUpdate={setStatus}					
				/>
			</Box>
		</Stack>
	);
};

export default HowCardPhoto;
