import CouponStore, { CouponContext } from "../../../store/coupon";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { AuthContext } from "../../../store/auth";
import CouponAction from "../../../store/coupon/action";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import showAlertDialog from "../../components/dialog/alert-dialog";
import { formatCurrency } from "../../../core/utils/formatter";
import { CheckoutContext } from "../../../store/checkout";
import CheckoutActions from "../../../store/checkout/actions";

const CartCouponSection = (props) => {
  return (
    <CouponStore>
      <InternalCmp />
    </CouponStore>
  );
};

const InternalCmp = (props) => {
  const [checkoutS, checkoutR] = useContext(CheckoutContext);
  const [couponS, couponR] = useContext(CouponContext);
  const [authS] = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    couponR({
      type: CouponAction.getCoupons,
      payload: { userId: authS.user._id },
    });
  }, [authS.user, couponR]);

  function handleClose() {
    setOpen(false);
  }

  function handleSubmitCode() {
    couponR({
      type: CouponAction.applyCoupon,
      payload: { userId: authS.user._id, code },
    });
  }

  function applyCoupon(coupon) {
    if (coupon.minOrderSize > checkoutS.cart.bill.itemTotal) {
      showAlertDialog({
        content:
          "This coupon is applicable only on orders above " +
          formatCurrency(coupon.minOrderSize),
      });
    } else {
      const id = checkoutS.cart.couponId === coupon._id ? "" : coupon._id;

      checkoutR({ type: CheckoutActions.applyCoupon, payload: id });
      setOpen(false);
    }
  }

  function getSelectedCoupon() {
    return (
      couponS.coupons.find((item) => item._id === checkoutS.cart.couponId) ?? {}
    );
  }

  return (
    <>
      <Box py={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" color="textPrimary">
            Coupon
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            style={{ borderWidth: 1.6 }}
            onClick={() => setOpen(true)}
          >
            <strong>apply coupon</strong>
          </Button>
        </Box>
        {checkoutS.cart.couponId && (
          <Box pt={1}>
            <Typography color="textPrimary">
              {getSelectedCoupon().code}
            </Typography>
            <Typography color="textSecondary">
              {getSelectedCoupon().description}
            </Typography>
          </Box>
        )}
      </Box>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {couponS.adding && (
          <Box
            height="100%"
            width="100%"
            position="absolute"
            top={0}
            left={0}
            bgcolor="#FFFFFFBB"
            zIndex={100}
          >
            <Box className="center">
              <CircularProgress />
            </Box>
          </Box>
        )}
        <DialogTitle id="simple-dialog-title">Select Coupon</DialogTitle>
        <DialogContent>
          <DialogContentText>Have a coupon code? Apply here.</DialogContentText>
          <Box display="flex">
            <TextField
              label="Coupon Code"
              variant="outlined"
              size="small"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Box px={1} />
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={handleSubmitCode}
            >
              <strong>submit</strong>
            </Button>
          </Box>
          {couponS.coupons.length > 0 && (
            <Box>
              <Box py={4}>
                <Divider />
              </Box>
              <Box>
                <Typography variant="body1" color="textSecondary">
                  Select from available coupons
                </Typography>
              </Box>
              <List>
                {couponS.coupons.map((item, index) => {
                  const isSelected = checkoutS.cart.couponId === item._id;

                  return (
                    <>
                      <ListItem>
                        <Box display="flex">
                          <Box pr={2}>
                            <ListItemText color="textPrimary">
                              {item.code}
                            </ListItemText>
                            <Typography variant="body2" color="textSecondary">
                              {item.description}
                            </Typography>
                          </Box>
                          <Button
                            color="primary"
                            onClick={() => applyCoupon(item)}
                          >
                            <strong>{isSelected ? "remove" : "apply"}</strong>
                          </Button>
                        </Box>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
              </List>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartCouponSection;
