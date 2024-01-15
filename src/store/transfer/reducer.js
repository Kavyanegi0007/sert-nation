import ReferralAction from "./action";

const TransferReducer = (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case ReferralAction.addToList:
			return {
				...state,
				transfers: [...payload],
			};

		case ReferralAction.updateState:
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};

export default TransferReducer;
