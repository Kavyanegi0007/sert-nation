import AuthWebClient from "../../core/axios/auth-web-client";

const CouponMethods = {
  fetchCoupons: async (userId) => {
    try {
      const response = await AuthWebClient.get(`/api/user/${userId}/coupon`);
      return { data: response.data };
    } catch (error) {
      return { error: error.response?.data ?? "failure" };
    }
  },

  applyCoupon: async (code, userId) => {
    try {
      const response = await AuthWebClient.post(
        `/api/user/${userId}/coupon/apply/${code}`
      );
      return { data: response.data };
    } catch (error) {
      return { error: error.response?.data ?? "failure" };
    }
  },
};

export default CouponMethods;
