import Api from "../../core/api";
import AuthWebClient from "../../core/axios/auth-web-client";
import WebClient from "../../core/axios/web-client";
import LocalStorageKeys from "../../core/constants/local-storage-keys";

const AuthMethods = {
	authenticate: async () => {
		let isLoggedIn = false;

		try {
			const token = localStorage.getItem(LocalStorageKeys.accessToken);
			if (token) isLoggedIn = true;
			else throw Error;

			const response = await AuthWebClient.get("/api/user");
			return { isLoggedIn, user: response.data };
		} catch (error) {
			return { isLoggedIn: false, user: null };
		}
	},

	getUser: async () => {
		try {
			const response = await AuthWebClient.get("/api/user");
			return { isLoggedIn: true, user: response.data };
		} catch (error) {
			return { error: error.response.data };
		}
	},

	signup: async (data) => {
		try {
			await WebClient.post("/api/register", data);
			return {};
		} catch (error) {
			return { error: error.response.data };
		}
	},

	verify: async (data) => {
		try {
			const response = await WebClient.post("/api/register/verify-otp", data);
			window.localStorage.setItem(LocalStorageKeys.accessToken, response.data.accessToken);
			window.localStorage.setItem(LocalStorageKeys.refreshToken, response.data.refreshToken);

			const userResponse = await WebClient.get("/api/user", {
				headers: { authorization: `Bearer ${response.data.accessToken}` },
			});

			return { isLoggedIn: true, user: userResponse.data };
		} catch (error) {
			return { error: error.response.data };
		}
	},

	resendOtp: async (data) => {
		try {
			await WebClient.post("/api/register/resend-otp", data);
			return {};
		} catch (error) {
			return { error: error.response.data };
		}
	},

	login: async (data, onNotVerified) => {
		try {
			const response = await WebClient.post("/api/user/access/login", data);

			window.localStorage.setItem(LocalStorageKeys.accessToken, response.data.accessToken);
			window.localStorage.setItem(LocalStorageKeys.refreshToken, response.data.refreshToken);

			return { isLoggedIn: true, user: response.data.user };
		} catch (error) {
			if (error.response.status === 403) {
				onNotVerified();
			}
			return { error: error.response.data };
		}
	},
};

export default AuthMethods;
