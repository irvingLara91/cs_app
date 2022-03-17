import React from "react";
import {Dimensions, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Header from "../Header";
import {Center} from "native-base";

const ContainerBase = ({ isHeader=true, backgroundColor="#F4F4F4",screenName = "POST_SPLASH", ...props}) => {

	return (
		<View
			style={{
				backgroundColor:backgroundColor,
				width: Dimensions.get("window").width,
				flex: 1
			}}
		>
			<View
				style={{
					width: "100%",
					height: Dimensions.get("window").height,
					zIndex: 20
				}}
			>
				{
					isHeader &&
					<Center>
						<Header screenName={screenName}/>
					</Center>
				}

				<KeyboardAwareScrollView
					extraScrollHeight={60}
					enableOnAndroid={true}
					keyboardShouldPersistTaps="handled">
					{props.children}
				</KeyboardAwareScrollView>

			</View>
		</View>
	);
};
export default ContainerBase;