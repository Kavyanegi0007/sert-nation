import React, { createContext, useCallback, useReducer } from "react";
import showAlertDialog from "../../views/components/dialog/alert-dialog";
import OrderAction from "./action";
import OrderMethods from "./method";
import OrderReducer from "./reducer";

const initialState = {
	loading: true,
	hasError: false,
	orders: [],
};

const OrderStore = ({ children }) => {
	const [state, dispatch] = useReducer(OrderReducer, initialState);

	const customDispatch = useCallback(async (action) => {
		const { payload, type } = action;

		switch (type) {
			case OrderAction.getOrders: {
				dispatch({ type: OrderAction.updateState, payload: { loading: true, hasError: false } });
				const { data, error } = await OrderMethods.fetchOrders(payload.userId);
				if (error) {
					dispatch({ type: OrderAction.updateState, payload: { loading: false, hasError: true } });
				} else {
					dispatch({ type: OrderAction.addToList, payload: data });
					dispatch({ type: OrderAction.updateState, payload: { loading: false, hasError: false } });
				}
				break;
			}

			case OrderAction.cancelOrder: {
				dispatch({ type: OrderAction.updateState, payload: { loading: true, hasError: false } });
				const { error } = await OrderMethods.cancelOrder(payload.id, payload.userId);
				if (error) {
					showAlertDialog({ content: "Failed to cancel your order" });
					dispatch({ type: OrderAction.updateState, payload: { loading: false, hasError: true } });
				} else {
					showAlertDialog({ content: "Your order has been canceled" });
					dispatch({
						type: OrderAction.updateInList,
						payload: { id: payload.id, orderStatus: "canceled" },
					});
					dispatch({ type: OrderAction.updateState, payload: { loading: false, hasError: false } });
				}
				break;
			}

			case OrderAction.returnOrder: {
				dispatch({ type: OrderAction.updateState, payload: { loading: true, hasError: false } });
				const { error } = await OrderMethods.returnOrder(payload.id, payload.userId);
				if (error) {
					showAlertDialog({ content: "Failed to process your request" });
					dispatch({ type: OrderAction.updateState, payload: { loading: false, hasError: true } });
				} else {
					showAlertDialog({ content: "Your order has queued for return" });
					dispatch({
						type: OrderAction.updateInList,
						payload: { id: payload.id, returnStatus: "requested" },
					});
					dispatch({ type: OrderAction.updateState, payload: { loading: false, hasError: false } });
				}
				break;
			}

			default:
				dispatch(action);
		}
	}, []);

	return <OrderContext.Provider value={[state, customDispatch]}>{children}</OrderContext.Provider>;
};

export const OrderContext = createContext(initialState);
export default OrderStore;
