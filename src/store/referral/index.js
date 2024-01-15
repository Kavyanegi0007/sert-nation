import { createContext, useCallback, useReducer } from "react";
import showAlertDialog from "../../views/components/dialog/alert-dialog";
import ReferralAction from "./action";
import ReferralMethods from "./methods";
import ReferralReducer from "./reducer";

const initialState = {
	loading: true,
	hasError: true,
	referrals: [],
	commission: 0,

	isReferralAvailable: false,
};

const ReferralStore = ({ children }) => {
	const [state, dispatch] = useReducer(ReferralReducer, initialState);

	const customDispatch = useCallback(async (action) => {
		const { payload, type } = action;

		switch (type) {
			case ReferralAction.getReferrals: {
				dispatch({ type: ReferralAction.updateState, payload: { loading: true, hasError: false } });
				const { data, error } = await ReferralMethods.fetchReferrals(payload.userId);
				if (error)
					dispatch({
						type: ReferralAction.updateState,
						payload: { loading: false, hasError: true },
					});
				else {
					dispatch({ type: ReferralAction.addToList, payload: data.referrals });
					dispatch({
						type: ReferralAction.updateState,
						payload: { loading: false, hasError: false, commission: data.commission },
					});
				}
				break;
			}

			case ReferralAction.requestTransfer: {
				// dispatch({ type: ReferralAction.updateState, payload: { loading: true, hasError: false } });
				const { error } = await ReferralMethods.requestTransfer(payload.id, payload.userId);
				if (error)
					dispatch({
						type: ReferralAction.updateState,
						payload: { loading: false, hasError: true },
					});
				else {
					dispatch({ type: ReferralAction.removeFromList, payload: { id: payload.id } });
					dispatch({
						type: ReferralAction.updateState,
						payload: { loading: false, hasError: false },
					});
					showAlertDialog({
						title: "Success",
						content:
							"You referral has been shifted to transfers and you will recieve your amount within 4 days. Also, update your transfer details if not updated yet in the transfer section",
					});
				}
				break;
			}

			case ReferralAction.checkReferral: {
				dispatch({ type: ReferralAction.updateState, payload: { loading: true, hasError: false } });
				const { isEligible, error } = await ReferralMethods.checkReferral(payload.userId);
				if (error)
					dispatch({
						type: ReferralAction.updateState,
						payload: { loading: false, hasError: true },
					});
				else {
					dispatch({
						type: ReferralAction.updateState,
						payload: { isReferralAvailable: isEligible, loading: false, hasError: false },
					});
				}
				break;
			}

			case ReferralAction.applyForReferral: {
				dispatch({ type: ReferralAction.updateState, payload: { loading: true, hasError: false } });
				const { error } = await ReferralMethods.applyForReferral(payload.userId);
				if (error) {
					showAlertDialog({
						title: "Success",
						content: error,
					});
					dispatch({
						type: ReferralAction.updateState,
						payload: { loading: false, hasError: true },
					});
				} else {
					dispatch({
						type: ReferralAction.updateState,
						payload: { isReferralAvailable: false, loading: false, hasError: false },
					});
					showAlertDialog({
						title: "Success",
						content:
							"Your referral code has been activated. Please refresh this page and look in the side-menu to view your referral code.",
					});
				}
				break;
			}

			default:
				dispatch(action);
		}
	}, []);

	return (
		<ReferralContext.Provider value={[state, customDispatch]}>{children}</ReferralContext.Provider>
	);
};

export const ReferralContext = createContext(initialState);
export default ReferralStore;
