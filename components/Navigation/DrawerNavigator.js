import React from "react";

import {
	createDrawerNavigator,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
	Box,
	Pressable,
	VStack,
	Text,
	HStack,
	Divider,
	Icon,
} from "native-base";

import Home from "~/components/Home";
import OrderDetails from "~/components/OrderDetails";

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
	switch (screenName) {
	case "Home":
		return "home-variant-outline";
	case "Orders":
		return "clipboard-check-outline";
	case "Profile":
		return "face-profile";
	case "Help":
		return "help-circle-outline";
	case "LogOut":
		return "logout";
	default:
		return undefined;
	}
};

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props} safeArea>
			<VStack space="6" my="2" mx="1">
				<Box px="4">
					<Text bold color="gray.700">
            Mail
					</Text>
					<Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            john_doe@gmail.com
					</Text>
				</Box>
				<VStack divider={<Divider />} space="4">
					<VStack space="3">
						{props.state.routeNames.map((name, index) => (
							<Pressable
								px="5"
								py="3"
								rounded="md"
								key={index}
								bg={
									index === props.state.index
										? "rgba(6, 182, 212, 0.1)"
										: "transparent"
								}
								onPress={(event) => {
									props.navigation.navigate(name);
								}}
							>
								<HStack space="7" alignItems="center">
									<Icon
										color={
											index === props.state.index ? "primary.500" : "gray.500"
										}
										size="7"
										as={<MaterialCommunityIcons name={getIcon(name)} />}
									/>
									<Text
										fontWeight="500"
										color={
											index === props.state.index ? "primary.500" : "gray.700"
										}
									>
										{name}
									</Text>
								</HStack>
							</Pressable>
						))}
					</VStack>
				</VStack>
			</VStack>
		</DrawerContentScrollView>
	);
}

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen
				name="Home"
				component={Home}
				initialParams={{ isFirstTime: true }}
				options={{
					drawerLabel: "Welcome",
					title: "Welcome",
				}}
			/>
			<Drawer.Screen
				name="Orders"
				component={OrderDetails}
				initialParams={{ isFirstTime: true }}
				options={{
					drawerLabel: "My Orders",
					title: "My Orders",
				}}
			/>
			<Drawer.Screen
				name="Profile"
				component={Home}
				initialParams={{ isFirstTime: true }}
				options={{
					drawerLabel: "My Profile",
					title: "My Profile",
				}}
			/>
			<Drawer.Screen
				name="Help"
				component={Home}
				initialParams={{ isFirstTime: true }}
				options={{
					drawerLabel: "Help",
					title: "Help",
				}}
			/>
			<Drawer.Screen
				name="LogOut"
				component={Home}
				options={{ drawerLabel: "Log Out" }}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
