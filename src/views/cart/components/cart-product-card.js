import { Button, Chip, colors, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React, { useContext } from "react";
import { formatCurrency } from "../../../core/utils/formatter";
import {
  getDDValuesForQty,
  getDifferent,
  getDiscount,
} from "../../../core/utils/product-util";
import { CheckoutContext } from "../../../store/checkout";
import CheckoutActions from "../../../store/checkout/actions";

const CartProductCardCmp = ({ item }) => {
  const [checkoutS, checkoutR] = useContext(CheckoutContext);

  const qty = checkoutS.cart.order.find((el) => el.sku === item.sku).quantity;

  function handleChange(e) {
    const { value } = e.target;

    checkoutR({
      type: CheckoutActions.updateQty,
      payload: { sku: item.sku, quantity: Number(value) },
    });
  }

  function handleRemove() {
    checkoutR({
      type: CheckoutActions.removeFromcart,
      payload: { sku: item.sku },
    });
  }

  return (
    <Box display="flex">
      <Box width={120} height={120}>
        <img src={item.img.src} alt="" />
      </Box>
      <Box display="flex" flexDirection="column" pl={1} flexGrow={1}>
        <Typography variant="body1" color="textPrimary">
          {item.name}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" color="textPrimary">
            {formatCurrency(item.sp)}
          </Typography>
          <Box pl={1} />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ textDecoration: "line-through" }}
          >
            {formatCurrency(item.mp)}
          </Typography>
          <Box pl={1} />
          <Chip
            label={getDiscount(item) + "% OFF"}
            size="small"
            color="primary"
          />
        </Box>
        <Box display="flex">
          {getDifferent(item).map((el) => (
            <Box display="flex" pr={2}>
              <Typography variant="body2" color="textSecondary">
                {el.name}
              </Typography>
              <Typography variant="body2">
                {" - "}
                {el.value}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pt={1}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Qty-
            </Typography>
            <Box pl={1} />
            <Box>
              <select
                name="cars"
                id="cars"
                style={{
                  backgroundColor: "#FFF",
                  fontFamily: "Work Sans",
                  border: "1px solid " + colors.grey[400],
                  borderRadius: 2,
                  padding: "2px 0",
                }}
                value={qty}
                onChange={handleChange}
              >
                {getDDValuesForQty(item.stock).map((i) => (
                  <option value={i}>{i}</option>
                ))}
              </select>
            </Box>
          </Box>
          <Box>
            <Button style={{ fontSize: 12 }} onClick={handleRemove}>
              remove
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartProductCardCmp;
