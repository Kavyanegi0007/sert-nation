import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useContext } from "react";
import { CheckoutContext } from "../../../store/checkout";
import CheckoutActions from "../../../store/checkout/actions";

const CartPaymentModeCmp = () => {
  const [checkoutS, checkoutR] = useContext(CheckoutContext);

  function handleChange(e) {
    const { name } = e.target;

    checkoutR({
      type: CheckoutActions.updatePaymentMethod,
      payload: name,
    });
  }

  return (
    <Box display="flex" flexDirection="column">
      <FormControlLabel
        control={
          <Checkbox
            checked={checkoutS.cart.paymentMode === "online"}
            onChange={handleChange}
            name="online"
          />
        }
        label="Online"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkoutS.cart.paymentMode === "offline"}
            onChange={handleChange}
            name="offline"
          />
        }
        label="Pay On Delivery"
      />
    </Box>
  );
};

export default CartPaymentModeCmp;
