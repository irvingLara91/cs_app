import React from "react";
import {Dimensions, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const ContainerBase = ({...props}) => {

	return (
		<View
			style={{
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
				<KeyboardAwareScrollView
					extraScrollHeight={80}
					enableOnAndroid={true}
					keyboardShouldPersistTaps="handled">
					{props.children}
				</KeyboardAwareScrollView>

			</View>
		</View>
	);
};
export default ContainerBase;