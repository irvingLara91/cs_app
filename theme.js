import { extendTheme } from "native-base";

const theme = extendTheme({
	colors: {
		// Add new color
		primary: {
			50: "#E3F2F9",
			100: "#C5E4F3",
			200: "#A2D4EC",
			300: "#7AC1E4",
			400: "#47A9DA",
			500: "#0088CC",
			600: "#007AB8",
			700: "#006BA1",
			800: "#005885",
			900: "#003F5E",
		},
		// Redefinig only one shade, rest of the color will remain same.
		amber: {
			400: "#d97706",
		},
	},
	fontConfig: {
		Roboto: {
			100: {
				normal: "Roboto_100Thin",
				italic: "Roboto_100Thin_Italic",
			},
			200: {
				normal: "Roboto_200Thin",
				italic: "Roboto_200Thin_Italic",
			},
			300: {
				normal: "Roboto_300Thin",
				italic: "Roboto_300Light_Italic",
			},
			400: {
				normal: "Roboto_400Regular",
				italic: "Roboto_400Regular_Italic",
			},
			500: {
				normal: "Roboto_500Medium",
			},
			700: {
				normal: "Roboto_700Bold",
				italic: "Roboto_700Bold_Italic",
			},
			900: {
				normal: "Roboto_900Black",
				italic: "Roboto_900Black_Italic",
			},
		},
	},

	// Make sure values below matches any of the keys in `fontConfig`
	fonts: {
		heading: "Roboto_400Regular",
		body: "Roboto_400Regular",
		mono: "Roboto_500Regular",
	},

	config: {
		// Changing initialColorMode to 'dark'
		initialColorMode: "light",
	},
});

export default theme;