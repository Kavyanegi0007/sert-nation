import LocalStorageKeys from "../../core/constants/local-storage-keys";
import CartAction from "./action";

const CartReducer = (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case CartAction.syncCart:
			return {
				...state,
				...payload,
			};

		case CartAction.updateCartState:
			return {
				...state,
				cartState: { ...payload },
			};

		case CartAction.updateOrderState:
			return {
				...state,
				orderState: { ...payload },
			};

		case CartAction.applyCredits:
			return {
				...state,
				getCartkey: !state.getCartkey,
				cart: { ...state.cart, credits: payload },
			};

		case CartAction.applyCoupon:
			return {
				...state,
				getCartkey: !state.getCartkey,
				cart: { ...state.cart, couponId: payload },
			};

		case CartAction.incQty: {
			const index = state.cart.order.findIndex((item) => item.productId === payload.productId);
			if (index === -1) {
				state.cart.order.push({ ...payload, quantity: 1 });
			} else {
				state.cart.order[index].quantity += 1;
			}
			saveCartToStorage(state.cart.order);
			state.getCartkey = !state.getCartkey;
			return { ...state };
		}

		case CartAction.decQty: {
			const index = state.cart.order.findIndex((item) => item.productId === payload.productId);
			if (state.cart.order[index].quantity === 1) {
				state.cart.order.splice(index, 1);
			} else {
				state.cart.order[index].quantity -= 1;
			}
			saveCartToStorage(state.cart.order);
			state.getCartkey = !state.getCartkey;
			return { ...state };
		}

		case CartAction.changeSize: {
			const index = state.cart.order.findIndex((item) => item.productId === payload.productId);
			if (index !== -1 && state.cart.order[index].size !== payload.size) {
				state.cart.order.splice(index, 1);
			}
			saveCartToStorage(state.cart.order);
			return { ...state };
		}

		case CartAction.updateAddress: {
			return { ...state, cart: { ...state.cart, address: { ...payload } } };
		}

		case CartAction.changePaymentMode: {
			return {
				...state,
				cart: { ...state.cart, paymentMode: payload },
				getCartkey: !state.getCartkey,
			};
		}

		default:
			return state;
	}
};

const saveCartToStorage = (order) => {
	const trimmedOrder = order.map((item) => ({
		productId: item.productId,
		size: item.size,
		quantity: item.quantity,
	}));
	window.localStorage.setItem(LocalStorageKeys.cart, JSON.stringify(trimmedOrder));
};

export default CartReducer;
