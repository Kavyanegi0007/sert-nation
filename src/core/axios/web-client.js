import axios from "axios";
import Config from "../config";

const WebClient = axios.create({
	baseURL: Config.endpoint,
	timeout: 10000,
});

WebClient.defaults.headers.post["Content-Type"] = "application/json";

// Request interceptor
// WebClient.interceptors.request.use(
// 	function (config) {
// 		// Do something before request is sent
// 		return config;
// 	},
// 	function (error) {
// 		// Do something with request error
// 		return Promise.reject(error);
// 	},
// );

export default WebClient;
