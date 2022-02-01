module.exports = {
	env: {
		browser: true,
		es2021: true,
	},

	extends: ["eslint:recommended", "plugin:react/recommended"],

	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	"plugins": [
		"react-hooks"
	],
	rules: {
		"react-hooks/rules-of-hooks": "error",
		"react/prop-types": "off",
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
