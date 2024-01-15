import AuthWebClient from "../../core/axios/auth-web-client";

const ReferralMethods = {
	fetchReferrals: async (userId) => {
		try {
			const response = await AuthWebClient.get(`/api/user/${userId}/transfer/referrals`);
			return { data: response.data };
		} catch (error) {
			return { error: error.response?.data ?? "Failed" };
		}
	},

	requestTransfer: async (id, userId) => {
		try {
			await AuthWebClient.patch(`/api/user/${userId}/transfer/${id}/request`);
			return {};
		} catch (error) {
			return { error: error.response?.data ?? "Failed" };
		}
	},

	checkReferral: async (userId) => {
		try {
			const response = await AuthWebClient.get(`/api/user/${userId}/subscription/check`);

			if (response.status !== 290) {
				return { isEligible: true };
			} else {
				return { isEligible: false };
			}
		} catch (error) {
			return { error: error.response?.data ?? "Failed" };
		}
	},

	applyForReferral: async (userId) => {
		try {
			await AuthWebClient.patch(`/api/user/${userId}/subscription/apply`);

			return {};
		} catch (error) {
			return { error: error.response?.data ?? "Failed" };
		}
	},
};

export default ReferralMethods;
