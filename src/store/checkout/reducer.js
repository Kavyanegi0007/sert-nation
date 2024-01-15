import LocalStorageKeys from "../../core/constants/local-storage-keys";
import CheckoutActions from "./actions";

const CheckoutReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case CheckoutActions.updateQty: {
      const index = state.cart.order.findIndex(
        (item) => item.sku === payload.sku
      );

      if (index === -1) {
        state.cart.order.push({ ...payload });
      } else {
        state.cart.order[index] = { ...state.cart.order[index], ...payload };
      }
      saveCartToStorage(state.cart.order);

      return { ...state, cartUpdated: state.cartUpdated + 1 };
    }

    case CheckoutActions.removeFromcart: {
      const index = state.cart.order.findIndex(
        (item) => item.sku === payload.sku
      );
      state.cart.order.splice(index, 1);
      saveCartToStorage(state.cart.order);

      return { ...state, cartUpdated: state.cartUpdated + 1 };
    }

    case CheckoutActions.updateState: {
      return { ...state, ...payload };
    }

    case CheckoutActions.updateAddress: {
      state.cart.address = { ...payload };
      saveAddressToStorage(payload);

      return { ...state };
    }

    case CheckoutActions.updatePaymentMethod: {
      state.cart.paymentMode = payload;

      return { ...state, cartUpdated: state.cartUpdated + 1 };
    }

    case CheckoutActions.applyCredits: {
      state.cart.credits = payload;

      return { ...state, cartUpdated: state.cartUpdated + 1 };
    }

    case CheckoutActions.applyCoupon: {
      console.log({ payload });
      state.cart.couponId = payload;

      return { ...state, cartUpdated: state.cartUpdated + 1 };
    }

    case CheckoutActions.syncCart: {
      const orderString = window.localStorage.getItem(LocalStorageKeys.cart);
      if (orderString) {
        const order = JSON.parse(orderString);
        state.cart = { ...state.cart, order };
      }
      const addrString = window.localStorage.getItem(LocalStorageKeys.address);
      if (addrString) {
        const addr = JSON.parse(addrString);
        state.cart.address = { ...addr };
      }

      return { ...state };
    }

    default:
      return state;
  }
};

const saveCartToStorage = (order) => {
  window.localStorage.setItem(LocalStorageKeys.cart, JSON.stringify(order));
};

const saveAddressToStorage = (addr) => {
  window.localStorage.setItem(LocalStorageKeys.address, JSON.stringify(addr));
};

export default CheckoutReducer;
