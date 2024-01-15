import { createContext, useCallback, useReducer } from "react";
import showAlertDialog from "../../views/components/dialog/alert-dialog";
import TransferAction from "./action";
import TransferMethods from "./methods";
import TransferReducer from "./reducer";

const initialState = {
	loading: true,
	hasError: true,
	transfers: [],
	transferDetails: {},
};

const TransferStore = ({ children }) => {
	const [state, dispatch] = useReducer(TransferReducer, initialState);

	const customDispatch = useCallback(async (action) => {
		const { payload, type } = action;

		switch (type) {
			case TransferAction.getTransfers: {
				dispatch({ type: TransferAction.updateState, payload: { loading: true, hasError: false } });
				const { data, error } = await TransferMethods.fetchTransfers(payload.userId);
				if (error)
					dispatch({
						type: TransferAction.updateState,
						payload: { loading: false, hasError: true },
					});
				else {
					dispatch({ type: TransferAction.addToList, payload: data.referrals });
					dispatch({
						type: TransferAction.updateState,
						payload: {
							loading: false,
							hasError: false,
							transferDetails: data.transferDetails ?? {},
						},
					});
				}
				break;
			}

			case TransferAction.updateDetails: {
				dispatch({ type: TransferAction.updateState, payload: { loading: true, hasError: false } });
				const { error } = await TransferMethods.updateTransferDetail(payload.data, payload.userId);
				if (error)
					dispatch({
						type: TransferAction.updateState,
						payload: { loading: false, hasError: true },
					});
				else {
					showAlertDialog({ content: "Your transfer details have been updated" });
					dispatch({
						type: TransferAction.updateState,
						payload: {
							loading: false,
							hasError: false,
						},
					});
				}
				break;
			}

			default:
				dispatch(action);
		}
	}, []);

	return (
		<TransferContext.Provider value={[state, customDispatch]}>{children}</TransferContext.Provider>
	);
};

export const TransferContext = createContext(initialState);
export default TransferStore;
