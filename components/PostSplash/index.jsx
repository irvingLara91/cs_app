import React from "react";
import {Center, Stack, Box, Button, Image, Text} from "native-base";
import screens from "~/constants/screens";
import Carousel from "~/components/common/Carousel";
import CSLogo from "~/assets/cornerstone-logo-300px.png";
import {Link} from "@react-navigation/native";
import {textSizeRender} from "~/utils/utils";

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
                    <Button bgColor="primary_black.900" borderRadius={0} size="lg" onPress={() => navigation.navigate(screens.LOGIN)}>
                        Log in
                    </Button>
                </Box>
                <Box>
                    <Button bgColor="primary_black.400" borderRadius={0} size="lg" onPress={() => navigation.navigate(screens.REGISTER)}>
                        Sign up
                    </Button>
                </Box>

                <Box>
                    <Link
                        to={{screen: screens.LOGIN_ADMIN}}
                        style={{
                            marginTop:20,
                            fontSize: 13,
                            textAlign: "center"
                    }}
                    >
                        <Text fontFamily={"Roboto_400Regular"} fontSize={textSizeRender(3.5)} >You are a cornerstone technician?</Text>  <Text underline fontFamily={"Roboto_700Bold"} fontSize={textSizeRender(3.5)}>Log in</Text>
                    </Link>
                </Box>
            </Stack>
        </Center>
    );
};

export default PostSplash;

