import ReferralAction from "./action";

const ReferralReducer = (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case ReferralAction.addToList:
			return {
				...state,
				referrals: [...payload],
			};

		case ReferralAction.removeFromList: {
			const index = state.referrals.findIndex((item) => item._id === payload.id);
			state.referrals.splice(index, 1);
			return {
				...state,
				referrals: [...state.referrals],
			};
		}

		case ReferralAction.updateState:
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};

export default ReferralReducer;
