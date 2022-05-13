import React, {useRef, useState} from "react";
import {StyleSheet, Dimensions, View, Text, ImageBackground} from "react-native";
import RNCarousel, {Pagination} from "react-native-snap-carousel";
import {LinearGradient} from "expo-linear-gradient";
import {textSizeRender} from "~/utils/utils";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH / 1.1);

const styles = StyleSheet.create({
    dots: {
		top:-ITEM_HEIGHT * .20,
        width: ITEM_HEIGHT * .05,
        height: ITEM_HEIGHT * .05,
        borderRadius: ITEM_HEIGHT * .05,
        backgroundColor: "#ffffff",
    },
    itemContainer: {
        width: SLIDER_WIDTH,
        height: SLIDER_WIDTH / 1.3,

    },
    text: {
        fontSize: textSizeRender(8),
        fontFamily: "Roboto_900Black",
        color: 'white'
    }
});


const CarouselFull = ({data, containerStyle = {},}) => {
    const carouselRef = useRef();
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const ITEM_WIDTH = SLIDER_WIDTH;
    const length = data.length;

    const [slide, setSlide] = useState(0);


    const renderItem = ({item,index}) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <ImageBackground source={item.img} resizeMode="cover" style={{
                    width: '100%',
                    height: '100%',
                }}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.28)', 'rgba(0,0,0,0.32)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.24)', 'rgba(0,0,0,.0)']}
                        style={{
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            height: '100%',
                            paddingHorizontal: 8,
                            paddingVertical: 16,
                        }}/>
                    <View style={{padding:20}}>
                        <Text style={styles.text}>
                            {item.title}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    return (
        <View>
            <RNCarousel
                layout={"tinder"}
                ref={carouselRef}
                data={data}
				autoplay={true}
				loop={true}
				autoplayDelay={data.length}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH}
                onSnapToItem={(i) => setSlide(i)}
            />
            <View style={{justifySelf: 'center'}}>
                <Pagination
                    containerStyle={containerStyle}
                    dotStyle={styles.dots}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    activeDotIndex={slide}
                    dotsLength={length}
                />
            </View>
        </View>
    );
};

export default CarouselFull;
