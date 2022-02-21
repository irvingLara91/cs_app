import React from "react";
import {Box, Center, Heading, Link, Stack, Text, Button, Image} from "native-base";
import {useNavigation} from "@react-navigation/native";

import welcomeImage from "~/assets/image-white.png";
import screens from "~/constants/screens";
import {useAuthUserContext} from "~/context/authUser";

const Welcome = () => {
    const navigation = useNavigation();
    const {FirstTime} = useAuthUserContext()

    return (
        <Center flex={1} px="3">
            <Center>
                <Box bgColor="dark.50" rounded="xl" p="10">
                    <Stack mt={3} space={4} alignItems="center" w="full" maxW="300px">
                        <Center mt={8} mb={8}>
                            <Image source={welcomeImage} alt="welcome"/>
                        </Center>
                        <Heading fontSize={28} color="white">
                            Welcome to the cornerstone app
                        </Heading>
                        <Text color="white">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus
                            lobortis diam sed.
                        </Text>
                        <Button size="lg" onPress={() =>{
                            FirstTime()
                            navigation.navigate({name: screens.NEW_ORDER})}}>
                            New Order
                        </Button>
                        <Link onPress={() => {
                            FirstTime()
                        }}><Text color="white">Maybe later</Text></Link>
                    </Stack>
                </Box>
            </Center>
        </Center>
    );
};

export default Welcome;