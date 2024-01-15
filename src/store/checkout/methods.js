import AuthWebClient from "../../core/axios/auth-web-client";
import LocalStorageKeys from "../../core/constants/local-storage-keys";

const CheckoutMethods = {
  fetchCart: async (userId, cart) => {
    try {
      const { data } = await AuthWebClient.post(
        `/api/user/${userId}/cart`,
        cart
      );
      data.order = data.order.products;
      data.paymentMode = data.payment.mode;
      data.credits = data.bill.credits;
      return { data };
    } catch (error) {
      return { error: true };
    }
  },

  placeOrder: async (data, userId) => {
    try {
      const response = await AuthWebClient.post(
        `/api/user/${userId}/order`,
        data
      );

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

export default CheckoutMethods;
