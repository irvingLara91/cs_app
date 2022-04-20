import React from "react";
import {Box, Divider} from "native-base";
import {View,StyleSheet,Text} from "react-native"
import LineOrderStatus from "~/components/LineOrderStatus/LineOrderStatus";
import {ScrollView} from "react-native";
import {SCREEN_WIDTH} from "~/utils/utils";

const Status = ({ code, msg }) => {
	return (
		<View style={styles.cardStatus}>
			<View style={{width:'100%',alignItems:'center'}}>
				<Text style={{
					paddingTop:10,
					marginBottom:0,
					textAlign:'center',
					fontFamily:"Roboto_700Bold",fontSize:SCREEN_WIDTH*.07}}>Status order</Text>
				<Divider mt="2"/>
			</View>

			<View style={{width: '100%',paddingVertical:20}}>
				<LineOrderStatus status={code}/>
			</View>
		</View>
	);

};

const styles= StyleSheet.create({
	cardStatus:{
		marginTop: SCREEN_WIDTH * .04,
		alignItems: "center",
		borderColor: "#C4C4C4",
		borderWidth: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0, height: 4,
		},
		shadowOpacity: 0.30,
		shadowRadius: 4.65,
		elevation: 8,
		borderRadius: 10,
		backgroundColor: 'white',
	}
});

export default Status;