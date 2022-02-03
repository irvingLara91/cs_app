import { FAKE_USER_DETAILS } from "~/utils";

const getUserDetails = (userId) => {
	return new Promise((resolve, reject) => {
		const data = FAKE_USER_DETAILS;
		try {
			resolve(data);
		} catch(error) {
			reject(error);
		}
	});
};

const userService = { getUserDetails };

export default userService;