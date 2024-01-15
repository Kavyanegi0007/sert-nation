import AuthWebClient from "../../core/axios/auth-web-client";
import LocalStorageKeys from "../../core/constants/local-storage-keys";

const CartMethods = {
	getCart: async (data, userId) => {
		try {
			const response = await AuthWebClient.post(`/api/user/${userId}/cart`, data);
			return { cart: response.data };
		} catch (error) {
			return { error: error.response.data };
		}
	},

	placeOrder: async (data, userId) => {
		try {
			const response = await AuthWebClient.post(`/api/user/${userId}/order`, data);

			if (response.status === 202) {
				return { rzpOrder: response.data };
			}
			if (response.status === 290) {
				return { error: response.data.message };
			}
			window.localStorage.removeItem(LocalStorageKeys.cart);
			return {};
		} catch (error) {
			return { error: error.response?.data ?? "Failed to place order" };
		}
	},
};

export default CartMethods;
