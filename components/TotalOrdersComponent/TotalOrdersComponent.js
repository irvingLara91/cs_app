import {StyleSheet, View} from "react-native";
import {Text} from "native-base";
import {textSizeRender} from "~/utils/utils";

const TotalOrdersComponent=({total=null,...props})=>{

    return(
        <View style={[styles.viewTitleFix,{
            marginTop:15,
            alignItems:"center",
            backgroundColor:"#363636",
            padding:20,
            borderRadius: 5
        }]}>
            <Text  style={{flex: 1}}
                   color={"white"}
                   letterSpacing={"md"}
                   lineHeight={'sm'}
                   fontFamily={'Roboto_700Bold'}
                   fontSize={textSizeRender(15)}
            >{total ? total : 0}</Text>
            <Text
                style={{flex: 1}}
                color={"white"}
                letterSpacing={"md"}
                lineHeight={'sm'}
                fontFamily={'Roboto_700Bold'}
                fontSize={textSizeRender(3.5)}
            >Total orders</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    viewTitleFix: {
        flex: 1,
        justifyContent: 'center',
    },
});
export default TotalOrdersComponent;