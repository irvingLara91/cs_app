import {Dimensions, StyleSheet, View} from "react-native";
import {Text} from "native-base";
import {textSizeRender} from "~/utils/utils";
import {LinearGradient} from "expo-linear-gradient";

const TotalOrdersComponent = ({total = null, ...props}) => {

    return (
        <LinearGradient colors={["#555555","#171717"]} style={[styles.viewTitleFix, {
            height: Dimensions.get("window").width / 3,
            marginTop: 15,
            alignItems: "center",
            backgroundColor: "#363636",
            padding: 20,
            borderRadius: 10
        }]}>
            <Text style={{flex: 1}}
                  color={"white"}
                  letterSpacing={"md"}
                  lineHeight={'sm'}
                  fontFamily={'Roboto_700Bold'}
                  fontSize={textSizeRender(15)}
            >{total ? total : 0}</Text>
            <Text
                style={{flex: 0}}
                color={"white"}
                letterSpacing={"md"}
                lineHeight={'sm'}
                fontFamily={'Roboto_700Bold'}
                fontSize={textSizeRender(3.5)}
            >Total orders</Text>
        </LinearGradient>

    );
};

const styles = StyleSheet.create({
    viewTitleFix: {
        justifyContent: 'center',
    },
});
export default TotalOrdersComponent;