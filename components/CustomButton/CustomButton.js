import React, {useState} from "react";
import {TouchableOpacity,StyleSheet,Text} from "react-native";
import {textSizeRender} from "~/utils/utils";
import {LinearGradient} from "expo-linear-gradient";

const GradientBtn =({title,styled,gradient,borderRadius})=>{
    return(
        <LinearGradient colors={gradient}
                        style={[styles.button,{borderRadius:borderRadius}]}>
            <Text style={styled}>{title}</Text>
        </LinearGradient>
    );
}

const CustomButton =({heightButton=50,disabled=false,title="",onPress,gradient,textColor="",borderRadius=0})=>{

    const [colorText, setColorText] = useState(textColor ? textColor :'white')
    const [text, setText] = useState(title)
    const [tam_text, setTam_text] = useState(textSizeRender(4))

    return(

            <TouchableOpacity
                style={{
                    height: heightButton,
                    width: "100%",
                }}
                onPress={onPress}
                disabled={disabled}
            >
                <GradientBtn title={text}
                             borderRadius={borderRadius}
                             gradient={gradient} styled={{
                    fontSize: tam_text,
                    color: disabled ? "lightgray" : colorText,
                    textShadowColor: 'rgba(100, 100, 100, .5)',
                    textShadowOffset: {width: 1, height: 1},
                    textShadowRadius: 1
                }}/>
            </TouchableOpacity>
    )

}
const styles = StyleSheet.create({

    button: {
        marginTop:10,
        height: "100%",
        width: "100%",
        alignItems: 'center',
        shadowColor: "rgba(100,100,100,.75)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        justifyContent:'center',
    },
})

export default CustomButton;