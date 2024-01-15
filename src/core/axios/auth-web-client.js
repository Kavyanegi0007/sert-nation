import axios from "axios";
import Config from "../config";
import LocalStorageKeys from "../constants/local-storage-keys";

const AuthWebClient = axios.create({
	baseURL: Config.endpoint,
	timeout: 3000,
});

AuthWebClient.defaults.headers.common["Authorization"] = `Bearer ${window.localStorage.getItem(
	LocalStorageKeys.accessToken,
)}`;
AuthWebClient.defaults.headers.post["Content-Type"] = "application/json";

// Request interceptor
AuthWebClient.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
function createAxiosResponseInterceptor() {
	const interceptor = AuthWebClient.interceptors.response.use(
		(response) => response,
		(error) => {
			// Reject promise if usual error
			if (error.status !== 401) {
				return Promise.reject(error);
			}

			/*
			 * When response code is 401, try to refresh the token.
			 * Eject the interceptor so it doesn't loop in case
			 * token refresh causes the 401 response
			 */
			AuthWebClient.interceptors.response.eject(interceptor);

			return AuthWebClient.post("/api/v1/admin-user/renew-token", {
				refreshToken: window.localStorage.getItem(LocalStorageKeys.refreshToken),
			})
				.then((response) => {
					window.localStorage.setItem(LocalStorageKeys.accessToken, response.data.accessToken);
					window.localStorage.setItem(LocalStorageKeys.refreshToken, response.data.refreshToken);
					error.response.config.headers["Authorization"] = "Bearer " + response.data.access_token;
					return AuthWebClient(error.response.config);
				})
				.catch((error) => {
					window.localStorage.removeItem(LocalStorageKeys.accessToken);
					window.localStorage.removeItem(LocalStorageKeys.refreshToken);
					this.router.push("/login");
					return Promise.reject(error);
				})
				.finally(createAxiosResponseInterceptor);
		},
	);
}

createAxiosResponseInterceptor();

export default AuthWebClient;
