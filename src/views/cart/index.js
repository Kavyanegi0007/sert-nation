import {
  Box,
  Button,
  Container,
  Grid,
  Divider,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth";
import { CheckoutContext } from "../../store/checkout";
import CheckoutActions from "../../store/checkout/actions";
import NavBarCmp from "../components/nav-bar";
import CartAddressFromCmp from "./components/address-form";
import CartBillCmp from "./components/bill";
import CartProductCardCmp from "./components/cart-product-card";
import CartCouponSection from "./components/coupon-section";
import CartCreditCmp from "./components/credit-cmp";
import EmptyCartCmp from "./components/empty-cart";
import CartPaymentModeCmp from "./components/payment-mode";

const CartView = (props) => {
  const [checkoutS, checkoutR] = useContext(CheckoutContext);

  const [authS] = useContext(AuthContext);

  useEffect(() => {
    checkoutR({
      type: CheckoutActions.fetchCart,
      payload: { userId: authS.user._id, cart: checkoutS.cart },
    });

    return () => {
      checkoutR({
        type: CheckoutActions.updateState,
        payload: { loading: true },
      });
    };
  }, [authS.user._id, checkoutR, checkoutS.cartUpdated]);

  function handlePlaceOrder() {
    checkoutR({
      type: CheckoutActions.placeOrder,
      payload: { cart: checkoutS.cart, user: authS.user },
    });
  }

  if (checkoutS.loading)
    return (
      <>
        <NavBarCmp />
        <Box
          height="100vh"
          width="100vw"
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
      </>
    );

  return (
    <>
      <NavBarCmp />
      {checkoutS.cart.order.length === 0 ? (
        <EmptyCartCmp />
      ) : (
        <Box position="relative">
          {checkoutS.postingOrder && (
            <Box
              height="100%"
              width="100%"
              position="absolute"
              top={0}
              left={0}
              bgcolor="#FFFFFFBB"
              zIndex={100}
            >
              <Box
                className="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <CircularProgress />
                <Typography>
                  We are placing your order, please wait ...
                </Typography>
              </Box>
            </Box>
          )}
          <Container>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Box pr={{ xs: 0, md: 4 }}>
                  <Box py={2}>
                    <Typography variant="h6" color="textPrimary">
                      Items
                    </Typography>
                  </Box>
                  {checkoutS.cart.order.map((item, index) => (
                    <>
                      <CartProductCardCmp item={item} />
                      {checkoutS.cart.order.length !== index + 1 && (
                        <Box py={2}>
                          <Divider />
                        </Box>
                      )}
                    </>
                  ))}
                </Box>
                <Box py={2}>
                  <Typography variant="h6" color="textPrimary">
                    Delivery details
                  </Typography>
                  <CartAddressFromCmp />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box pl={{ xs: 0, md: 4 }}>
                  <CartCreditCmp />
                  <CartCouponSection />
                  <Box py={2}>
                    <Typography variant="h6" color="textPrimary">
                      Payment Mode
                    </Typography>
                    <CartPaymentModeCmp />
                  </Box>
                  <Box py={2}>
                    <Typography variant="h6" color="textPrimary">
                      Bill
                    </Typography>
                    <CartBillCmp />
                  </Box>
                  {checkoutS.error && (
                    <>
                      <Typography variant="body1" color="error">
                        <Box fontWeight={700} textAlign="center">
                          {checkoutS.error}
                        </Box>
                      </Typography>
                      <Box pt={2} />
                    </>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={checkoutS.postingOrder}
                    disableElevation
                    fullWidth
                    onClick={handlePlaceOrder}
                  >
                    <strong>place order</strong>
                  </Button>
                  <Box pt={2} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default CartView;
