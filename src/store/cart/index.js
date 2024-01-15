import { createContext, useCallback, useReducer } from "react";
import { useHistory } from "react-router-dom";
import LocalStorageKeys from "../../core/constants/local-storage-keys";
import { displayRazorpay } from "../../core/utils/razorpay";
import CartAction from "./action";
import CartMethods from "./methods";
import CartReducer from "./reducer";

const initialState = {
	cart: {
		address: {},
		order: [],
		couponId: "",
		credits: 0,
		paymentMode: "online",
		bill: {},
	},

	cartState: {
		loading: false,
		error: "",
	},

	getCartkey: true,

	orderState: {
		loading: false,
		rzpOrder: {},
		error: "",
		placed: false,
	},
};

const CartStore = ({ children }) => {
	const history = useHistory();
	const [state, dispatch] = useReducer(CartReducer, initialState);

	function cleanupCart() {
		dispatch({
			type: CartAction.updateOrderState,
			payload: { loading: false, error: "", placed: true },
		});
		dispatch({
			type: CartAction.syncCart,
			payload: {
				cart: {
					address: {},
					bill: {},
					order: [],
					paymentMode: "online",
					couponId: "",
					credits: 0,
				},
			},
		});
		window.localStorage.removeItem(LocalStorageKeys.cart);
		// history.push({ pathname: Routes.home.path });
	}

	const customDispatch = useCallback(async (action) => {
		const { payload, type } = action;

		switch (type) {
			case CartAction.loadCartFromLocal: {
				const order = window.localStorage.getItem(LocalStorageKeys.cart);
				state.cart.order = JSON.parse(order) ?? [];
				dispatch({ type: CartAction.syncCart, payload: state });

				break;
			}

			case CartAction.fetchCart: {
				dispatch({
					type: CartAction.updateCartState,
					payload: { loading: true, error: "", placed: true },
				});

				const { error, cart } = await CartMethods.getCart(payload.cart, payload.userId);

				if (error) {
					dispatch({ type: CartAction.updateCartState, payload: { loading: false, error: error } });
				} else {
					dispatch({ type: CartAction.updateCartState, payload: { loading: false, error: "" } });
					dispatch({
						type: CartAction.syncCart,
						payload: {
							cart: {
								address: cart.address,
								bill: cart.bill,
								order: cart.order.products,
								paymentMode: cart.payment.mode,
								couponId: cart.couponId,
								credits: cart.bill.credits,
							},
						},
					});
				}
				break;
			}

			case CartAction.placeOrder: {
				dispatch({
					type: CartAction.updateOrderState,
					payload: { loading: true, error: "", rzpOrder: {} },
				});

				const { error, rzpOrder } = await CartMethods.placeOrder(payload.cart, payload.user._id);

				if (error) {
					dispatch({
						type: CartAction.updateOrderState,
						payload: { loading: false, error: error, rzpOrder: {} },
					});
				} else {
					if (rzpOrder && Object.keys(rzpOrder).length > 0) {
						dispatch({
							type: CartAction.updateOrderState,
							payload: { loading: false, error: "", rzpOrder },
						});
						displayRazorpay(payload.user, rzpOrder, cleanupCart);
					} else {
						cleanupCart();
					}
				}
				break;
			}

			default:
				dispatch(action);
		}
	}, []);

	return <CartContext.Provider value={[state, customDispatch]}>{children}</CartContext.Provider>;
};

export const CartContext = createContext(initialState);
export default CartStore;
