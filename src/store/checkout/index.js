import React, { createContext, useCallback, useReducer } from "react";
import LocalStorageKeys from "../../core/constants/local-storage-keys";
import { displayRazorpay } from "../../core/utils/razorpay";
import CheckoutActions from "./actions";
import CheckoutMethods from "./methods";
import CheckoutReducer from "./reducer";

const initialState = {
  cart: {
    address: {},
    order: [],
    couponId: "",
    credits: 0,
    paymentMode: "online",
    bill: {},
  },
  cartUpdated: 0,

  loading: true,
  postingOrder: false,
  error: "",
  rzpOrder: {},
  placed: false,
};

const CheckoutStore = ({ children }) => {
  const [state, dispatch] = useReducer(CheckoutReducer, initialState);

  function cleanupCart() {
    dispatch({
      type: CheckoutActions.updateState,
      payload: {
        postingOrder: false,
        error: "",
        placed: true,
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
  }

  const customDispatch = useCallback(async (action) => {
    const { payload, type } = action;

    switch (type) {
      case CheckoutActions.fetchCart: {
        dispatch({
          type: CheckoutActions.updateState,
          payload: { loading: true },
        });
        const { data, error } = await CheckoutMethods.fetchCart(
          payload.userId,
          payload.cart
        );
        if (error) {
          dispatch({
            type: CheckoutActions.updateState,
            payload: { error },
          });
        } else {
          dispatch({
            type: CheckoutActions.updateState,
            payload: { cart: data },
          });
        }

        dispatch({
          type: CheckoutActions.updateState,
          payload: { loading: false },
        });
        break;
      }

      case CheckoutActions.placeOrder: {
        dispatch({
          type: CheckoutActions.updateState,
          payload: { postingOrder: true },
        });
        const { error, rzpOrder } = await CheckoutMethods.placeOrder(
          payload.cart,
          payload.user._id
        );
        if (error) {
          dispatch({
            type: CheckoutActions.updateState,
            payload: { loading: false, error: error, rzpOrder: {} },
          });
        } else {
          if (rzpOrder && Object.keys(rzpOrder).length > 0) {
            dispatch({
              type: CheckoutActions.updateState,
              payload: { postingOrder: false, error: "", rzpOrder },
            });
            displayRazorpay(payload.user, rzpOrder, cleanupCart);
          } else {
            cleanupCart();
          }
        }
        dispatch({
          type: CheckoutActions.updateState,
          payload: { postingOrder: false },
        });
        break;
      }

      default:
        dispatch(action);
    }
  }, []);

  return (
    <CheckoutContext.Provider value={[state, customDispatch]}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const CheckoutContext = createContext(initialState);
export default CheckoutStore;
