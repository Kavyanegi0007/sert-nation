import AuthWebClient from "../../core/axios/auth-web-client";

const OrderMethods = {
	fetchOrders: async (userId) => {
		try {
			const orders = await AuthWebClient.get(`/api/user/${userId}/order`);
			return { data: orders.data };
		} catch (error) {
			return { error: error.response?.data ?? "failure" };
		}
	},

	cancelOrder: async (id, userId) => {
		try {
			await AuthWebClient.patch(`api/user/${userId}/order/${id}/cancel`);
			return {};
		} catch (error) {
			return { error: error.response?.data ?? "failure" };
		}
	},

	returnOrder: async (id, userId) => {
		try {
			await AuthWebClient.patch(`api/user/${userId}/order/${id}/return`);
			return {};
		} catch (error) {
			return { error: error.response?.data ?? "failure" };
		}
	},
};

export default OrderMethods;
