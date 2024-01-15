import {
  Box,
  Button,
  colors,
  Radio,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { getCommonAttributes } from "../../../../core/utils/product-util";
import { displayRazorpay } from "../../../../core/utils/razorpay";
import { CartContext } from "../../../../store/cart";
import CartAction from "../../../../store/cart/action";
import { CheckoutContext } from "../../../../store/checkout";
import CheckoutActions from "../../../../store/checkout/actions";
import showAlertDialog from "../../../components/dialog/alert-dialog";

const ProductDialogSizesCmp = ({ variants, selVariant, setVariant }) => {
  const [checkoutS, checkoutR] = useContext(CheckoutContext);

  const commonVariants = getCommonAttributes(variants);

  function getIsAddedToCart(id) {
    return checkoutS.cart.order.findIndex((el) => el.sku === id) !== -1;
  }

  function toggleAddToCart(id) {
    if (!getIsAddedToCart(id)) {
      checkoutR({
        type: CheckoutActions.updateQty,
        payload: { sku: id, quantity: 1 },
      });
    } else {
      checkoutR({
        type: CheckoutActions.removeFromcart,
        payload: { sku: id },
      });
    }
  }

  return (
    <>
      <Box py={2}>
        <Typography variant="body2" color="textSecondary">
          Select Variants
        </Typography>
      </Box>
      <Box display="flex" flexWrap="wrap">
        {variants.map((item) => (
          <Item
            id={item._id}
            attrs={item.attrs}
            disabled={item.stock === 0}
            onClick={() => {
              setVariant(item);
            }}
            selected={getIsAddedToCart(item._id)}
            highlighted={item._id === selVariant._id}
            common={commonVariants}
            handleCartAction={toggleAddToCart}
          />
        ))}
      </Box>
      <Box pt={1}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          onClick={() => toggleAddToCart(selVariant._id)}
        >
          {!getIsAddedToCart(selVariant._id) ? "Add To Cart" : "Added"}
        </Button>
      </Box>
      <Box pt={4} pb={2}>
        <Typography variant="body2" color="textSecondary">
          Product Features
        </Typography>
      </Box>
      <Box>
        {commonVariants.map((el) => (
          <Box display="flex">
            <Box width={160}>
              <Typography variant="body2">
                <strong>{el.name}</strong>
              </Typography>
            </Box>
            <Box pr={2} />
            <Typography variant="body2">{el.value}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

const Item = ({
  id,
  attrs,
  disabled,
  selected,
  onClick,
  common,
  highlighted,
  handleCartAction,
}) => {
  const theme = useTheme();

  function checkCommon(attr) {
    const index = common.findIndex(
      (el) => el.name === attr.name && el.value === attr.value
    );

    if (index === -1) {
      return (
        <Box display="flex">
          <Typography variant="body2" color="textSecondary">
            <strong>{attr.name}</strong>
          </Typography>
          <Typography variant="body2">
            {" - "}
            {attr.value}
          </Typography>
          <br />
        </Box>
      );
    }
    return null;
  }

  return (
    <Box
      bgcolor={disabled ? colors.grey[200] : ""}
      border={
        "1.6px solid " +
        (highlighted ? theme.palette.primary.main : colors.grey[200])
      }
      borderRadius={4}
      // boxShadow={highlighted && theme.shadows[3]}
      style={{
        boxShadow:
          highlighted && "0px 0px 4px 0 " + theme.palette.primary.light,
      }}
      className={!disabled ? "cursor-pointer" : ""}
      tabIndex={0}
      display="flex"
      mr={1}
      mb={1}
      onClick={() => !disabled && onClick()}
    >
      <Box>
        <Radio
          color="primary"
          size="small"
          checked={selected}
          disabled={disabled}
          onClick={() => {
            onClick();
            if (selected) handleCartAction(id);
          }}
        />
      </Box>
      <Box pt={1} pb={1} pr={1}>
        {attrs.map((attr) => checkCommon(attr))}
      </Box>
    </Box>
  );
};

export default ProductDialogSizesCmp;
