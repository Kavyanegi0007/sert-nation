import AuthWebClient from "../../core/axios/auth-web-client";

const TransferMethods = {
	fetchTransfers: async (userId) => {
		try {
			const response = await AuthWebClient.get(`/api/user/${userId}/transfer/list`);
			return { data: response.data };
		} catch (error) {
			return { error: error.response?.data ?? "Failed" };
		}
	},

	updateTransferDetail: async (data, userId) => {
		try {
			await AuthWebClient.post(`/api/user/${userId}/transfer/details`, {
				mode: "bank",
				data,
			});
			return {};
		} catch (error) {
			return { error: error.response?.data ?? "Failed" };
		}
	},
};

export default TransferMethods;
