import React from "react";
import {Center, Stack, Box, Button, Image} from "native-base";
import screens from "~/constants/screens";
import Carousel from "~/components/common/Carousel";
import CSLogo from "~/assets/cornerstone-logo-300px.png";

const PostSplash = ({navigation}) => {
    const data = [
        {

            img: <Image alt="image" source={require("~/assets/image.png")}/>,
            title: "How does it work 1",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
        {
            img: <Image alt="image" source={require("~/assets/image.png")}/>,
            title: "How does it work 2",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
        {
            img: <Image alt="image" source={require("~/assets/image.png")}/>,
            title: "How does it work 3",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
    ];

    return (
        <Center>
            <Stack mt={10}>
                <Box>
                    <Image alt="image" source={CSLogo}/>
                </Box>
            </Stack>
            <Stack mt={60} space={4} w="75%" maxW="300px">
                <Carousel
                    data={data}
                />
                <Box>
                    <Button onPress={() => navigation.navigate(screens.LOGIN)}>
                        Login client
                    </Button>
                </Box>
				<Box>
					<Button onPress={() => navigation.navigate(screens.LOGIN_ADMIN)}>
						Login (admin and technician)
					</Button>
				</Box>
                <Box>
                    <Button onPress={() => navigation.navigate(screens.REGISTER)}>
                        Register
                    </Button>
                </Box>
            </Stack>
        </Center>
    );
};

export default PostSplash;

