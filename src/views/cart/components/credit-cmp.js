import { Box, Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { formatCurrency } from "../../../core/utils/formatter";
import { AuthContext } from "../../../store/auth";
import { CheckoutContext } from "../../../store/checkout";
import CheckoutActions from "../../../store/checkout/actions";
import showAlertDialog from "../../components/dialog/alert-dialog";

const CartCreditCmp = (props) => {
  const [checkoutS, checkoutR] = useContext(CheckoutContext);
  const [authS] = useContext(AuthContext);

  function handleApply() {
    const { credits } = authS.user;

    if (credits > 0 && checkoutS.cart.credits === 0) {
      const { itemTotal } = checkoutS.cart.bill;
      checkoutR({
        type: CheckoutActions.applyCredits,
        payload: Math.min(credits, itemTotal),
      });
    } else if (checkoutS.cart.credits > 0) {
      checkoutR({ type: CheckoutActions.applyCredits, payload: 0 });
    } else {
      showAlertDialog({ content: "You have insufficient credits right now." });
    }
  }

  if (authS.user.credits > 0)
    return (
      <Box py={2}>
        <Typography variant="h6"> Use Credits</Typography>
        <Typography variant="body1" color="textSecondary">
          {formatCurrency(authS.user.credits)} available
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <FormControlLabel
            control={
              <Checkbox
                checked={checkoutS.cart.credits > 0}
                onChange={handleApply}
                color="primary"
              />
            }
            label={!(checkoutS.cart.credits > 0) ? "Apply Credits" : "Applied"}
          />
          <Typography variant="body1" color="textPrimary">
            {formatCurrency(checkoutS.cart.credits)}
          </Typography>
        </Box>
      </Box>
    );

  return null;
};

export default CartCreditCmp;
