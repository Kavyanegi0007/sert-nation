import { Box, Typography, Divider } from "@material-ui/core";
import React, { useContext } from "react";
import { formatCurrency } from "../../../core/utils/formatter";
import { CartContext } from "../../../store/cart";
import { CheckoutContext } from "../../../store/checkout";

const CartBillCmp = (props) => {
  const [checkoutS] = useContext(CheckoutContext);

  return (
    <Box>
      <Item label="Item Total" value={checkoutS.cart.bill.itemTotal} />
      <Item label="Delivery Fee" value={checkoutS.cart.bill.deliveryFee} />
      <Item label="Coupon Discount" value={-checkoutS.cart.bill.discount} />
      <Item label="Credits Used" value={-checkoutS.cart.bill.credits} />
      <Box py={1}>
        <Divider />
      </Box>
      <Item label="Total" value={checkoutS.cart.bill.total} />
    </Box>
  );
};

const Item = ({ label, value }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body1" color="textPrimary">
        {label}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        <Box fontWeight={600}>{formatCurrency(Number(value))}</Box>
      </Typography>
    </Box>
  );
};

export default CartBillCmp;
