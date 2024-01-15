import CouponAction from "./action";

const CouponReducer = (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case CouponAction.addToList:
			return {
				...state,
				coupons: [...payload],
			};

		case CouponAction.appendToList:
			return {
				...state,
				coupons: [...state.coupons, payload],
			};

		case CouponAction.updateState: {
			return {
				...state,
				...payload,
			};
		}

		default:
			return state;
	}
};

export default CouponReducer;
