import React, {useRef, useState} from "react";
import {StyleSheet, Dimensions, Text, View} from "react-native";

import RNCarousel, {Pagination} from "react-native-snap-carousel";
import {LinearGradient} from "expo-linear-gradient";
import {textSizeRender} from "~/utils/utils";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH / 1.2);

const styles = StyleSheet.create({
    dots: {
        width: ITEM_HEIGHT * .05,
        height: ITEM_HEIGHT * .05,
        borderRadius: ITEM_HEIGHT * .05,
        backgroundColor: "black",
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT * 1.6,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C4C4C4",
        borderRadius: ITEM_HEIGHT * .15,
        padding: 10,
    },
});


const Carousel = ({data, containerStyle = {},}) => {
    const carouselRef = useRef();
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const ITEM_WIDTH = SLIDER_WIDTH;
    const length = data.length;

    const [slide, setSlide] = useState(0);


    const renderItem = ({item}) => {
        return (
            <LinearGradient colors={["#838B95", "#4A4E54"]} style={styles.itemContainer}>
                <View stayle={{flex: 1, justifyContent: "center", alignSelf: 'center'}}>
                    {item.img}
                </View>
                <View style={{
                    flex: .5, alignItems: "center",
                    justifyContent: 'center'
                }}>
                    <Text style={{color: "white", fontSize: textSizeRender(6), fontFamily: "Roboto_700Bold"}}>
                        {item.title}
                    </Text>
                    <View style={{}}>
                        <Text style={{
                            textAlign: 'center',
                            color: "white",
                            fontSize: textSizeRender(3),
                            fontFamily: "Roboto_400Regular"
                        }}>
                            {item.msg}</Text>
                    </View>
                </View>
            </LinearGradient>
        );
    };

    return (
        <View style={{marginTop: 20}}>
            <RNCarousel
                layout={"stack"}
                layoutCardOffset={3}
                ref={carouselRef}
                data={data}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(i) => setSlide(i)}
            />
            <Pagination
                containerStyle={containerStyle}
                dotStyle={styles.dots}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                activeDotIndex={slide}
                dotsLength={length}
            />
        </View>
    );
};

export default Carousel;
