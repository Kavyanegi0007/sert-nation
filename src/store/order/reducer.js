import OrderAction from "./action";

const OrderReducer = (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case OrderAction.addToList:
			return {
				...state,
				orders: [...state.orders, ...payload],
			};

		case OrderAction.updateInList: {
			const index = state.orders.findIndex((item) => item._id === payload.id);
			state.orders[index] = { ...state.orders[index], ...payload };
			return {
				...state,
				orders: [...state.orders],
			};
		}

		case OrderAction.updateState: {
			return {
				...state,
				...payload,
			};
		}

		default:
			return state;
	}
};

export default OrderReducer;
