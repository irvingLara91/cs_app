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
	Avatar,
	IconButton
} from "native-base";

import Home from "~/components/Home";
import OrderDetails from "~/components/OrderDetails";
import Profile from "~/components/Profile";

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
					<Avatar
						bg="indigo.500"
						size="xl"
						source={{
							uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
						}}
					></Avatar>
					<IconButton
						w={"40px"}
						top={"60px"}
						left={"70px"}
						position={"absolute"}
						icon={<Icon as={MaterialCommunityIcons} name="pencil" />}
						borderRadius="full"
						onPress={() => props.navigation.navigate("Profile")}
						_icon={{
							color: "red.500",
							size: "sm",
						}}
						_hover={{
							bg: "red.600:alpha.30",
						}}
						_pressed={{
							bg: "red.600:alpha.30",
							_icon: {
								name: "pencil-outline",
							},
							_ios: {
								_icon: {
									size: "sm",
								},
							},
						}}
						_ios={{
							_icon: {
								size: "sm",
							},
						}}
					/>

					<Text bold color="primary.700" pt={5}>
            Jonh Appleseed
					</Text>
				</Box>
				<Divider />
				<VStack divider={<Divider />} space="4">
					<VStack space="3">
						{props.state.routeNames.map((name, index) => (
							<>
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
									onPress={() => {
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
								{name === "Help" && <Divider />}
							</>
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
				initialParams={{ isFirstTime: false }}
				options={{
					drawerLabel: "Home",
					title: "Home",
				}}
			/>
			<Drawer.Screen
				name="Orders"
				initialParams={{ isFirstTime: false }}
				component={Home}
				options={{
					drawerLabel: "My Orders",
					title: "My Orders",
				}}
			/>
			<Drawer.Screen
				name="Profile"
				component={Profile}
				options={{
					drawerLabel: "My Profile",
					title: "My Profile",
				}}
			/>
			<Drawer.Screen
				name="Help"
				component={Home}
				initialParams={{ isFirstTime: false }}
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