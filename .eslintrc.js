module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},

	rules: {
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
