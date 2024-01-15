import React, { createContext, useCallback, useReducer } from "react";
import showAlertDialog from "../../views/components/dialog/alert-dialog";
import CouponAction from "./action";
import CouponMethods from "./methods";
import CouponReducer from "./reducer";

const initialState = {
	loading: true,
	hasError: false,
	coupons: [],

	adding: false,
	addingError: false,
};

const CouponStore = ({ children }) => {
	const [state, dispatch] = useReducer(CouponReducer, initialState);

	const customDispatch = useCallback(async (action) => {
		const { payload, type } = action;

		switch (type) {
			case CouponAction.getCoupons: {
				dispatch({ type: CouponAction.updateState, payload: { loading: true, hasError: false } });
				const { data, error } = await CouponMethods.fetchCoupons(payload.userId);
				if (error) {
					dispatch({ type: CouponAction.updateState, payload: { loading: false, hasError: true } });
				} else {
					dispatch({ type: CouponAction.addToList, payload: data });
					dispatch({
						type: CouponAction.updateState,
						payload: { loading: false, hasError: false },
					});
				}
				break;
			}

			case CouponAction.applyCoupon: {
				dispatch({ type: CouponAction.updateState, payload: { adding: true, addingError: false } });
				const { data, error } = await CouponMethods.applyCoupon(payload.code, payload.userId);
				if (error) {
					showAlertDialog({ content: error });
					dispatch({
						type: CouponAction.updateState,
						payload: { adding: false, addingError: true },
					});
				} else {
					showAlertDialog({
						content: "Coupon added successfully, please select from the list to apply",
					});
					dispatch({ type: CouponAction.appendToList, payload: data });
					dispatch({
						type: CouponAction.updateState,
						payload: { adding: false, addingError: false },
					});
				}
				break;
			}

			default:
				dispatch(action);
		}
	}, []);

	return (
		<CouponContext.Provider value={[state, customDispatch]}>{children}</CouponContext.Provider>
	);
};

export const CouponContext = createContext(initialState);
export default CouponStore;
