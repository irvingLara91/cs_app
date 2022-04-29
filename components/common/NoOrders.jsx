import React from "react";
import {Center, Image, Heading} from "native-base";
import disabledImage from "~/assets/icon_notorder.png";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";


const NoOrders = () => {
    return (
        <Center mb="4">
            <Image w={SCREEN_WIDTH * .35} resizeMode={'contain'} source={disabledImage} alt="no orders"/>
            <Heading
                fontFamily={"Roboto_500Medium"}
                color={'#939393'}
                w={SCREEN_WIDTH * .5} textAlign="center" fontSize={textSizeRender(7)}>You currently have no
                orders</Heading>
        </Center>
    );
};

export default NoOrders;
