import React from "react";
import {Center, Stack, Box, Button, Image, Text} from "native-base";
import screens from "~/constants/screens";
import Carousel from "~/components/common/Carousel";
import CSLogo from "~/assets/cornerstone-logo-300px.png";
import {Link} from "@react-navigation/native";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import CustomButton from "~/components/CustomButton/CustomButton";
import ContainerBase from "~/components/common/ContainerBase";
import {Platform} from "react-native";

const PostSplash = ({navigation}) => {
    const data = [
        {

            img: <Image alt="image" resizeMode={"contain"} w={SCREEN_WIDTH*.6} h={SCREEN_WIDTH*.5} source={require("~/assets/init.png")}/>,
            title: "How does it work 1",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
        {
            img: <Image alt="image" resizeMode={"contain"}  w={SCREEN_WIDTH*.6} h={SCREEN_WIDTH*.5} source={require("~/assets/init.png")}/>,
            title: "How does it work 2",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
        {
            img: <Image alt="image" resizeMode={"contain"}  w={SCREEN_WIDTH*.6} h={SCREEN_WIDTH*.5} source={require("~/assets/init.png")}/>,
            title: "How does it work 3",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
    ];

    return (
        <ContainerBase backgroundColor={"white"} isHeader={false}>
            <Center>
                <Stack mt={Platform.OS === "ios" ? 10 : 5}>
                    <Box>
                        <Image alt="image" source={CSLogo}/>
                    </Box>
                </Stack>
                <Stack mt={5} space={4} w="75%" maxW="300px">
                    <Carousel
                        data={data}
                    />
                    <Box>
                        <CustomButton onPress={() => navigation.navigate(screens.LOGIN)}
                                      title={"Log In"}
                                      textColor={"#fff"}
                                      gradient={["#555555", "#171717"]}
                                      borderRadius={10}/>
                    </Box>
                    <Box>
                        <CustomButton onPress={() => navigation.navigate(screens.REGISTER)}
                                      title={"Sign up"}
                                      textColor={"#fff"}
                                      gradient={["#838B95", "#4A4E54"]}
                                      borderRadius={10}/>
                    </Box>

                    <Box>
                        <Link
                            to={{screen: screens.LOGIN_ADMIN}}
                            style={{
                                marginTop: 20,
                                fontSize: 13,
                                textAlign: "center"
                            }}
                        >
                            <Text fontFamily={"Roboto_400Regular"} fontSize={textSizeRender(3.5)}>You are a cornerstone
                                technician?</Text> <Text underline fontFamily={"Roboto_700Bold"}
                                                         fontSize={textSizeRender(3.5)}>Log in</Text>
                        </Link>
                    </Box>
                </Stack>
            </Center>
        </ContainerBase>

    );
};

export default PostSplash;

