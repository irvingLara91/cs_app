import React from "react";
import {Box, Text, } from "native-base";
import {View} from "react-native"
import LineOrderStatus from "~/components/LineOrderStatus/LineOrderStatus";
import {Dimensions} from "react-native";

const Status = ({ code, msg }) => {
	return (
		<View>
			<Text style={{
				paddingTop:10,
				marginBottom:20,
				textAlign:'center',
				fontFamily:"Roboto_700Bold",fontSize:Dimensions.get("window").width*.07}}>Status order</Text>
			<View style={{marginBottom:20}}>
				<LineOrderStatus/>
			</View>
		</View>
	);

};

export default Status;