import { Box, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CheckoutContext } from "../../../store/checkout";
import CheckoutActions from "../../../store/checkout/actions";

const CartAddressFromCmp = () => {
  const [checkoutS, checkoutR] = useContext(CheckoutContext);
  const [state, setState] = useState({});
  const [error, setError] = useState({});

  useState(() => {
    setState({ ...checkoutS.cart.address });
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
    setError({
      ...error,
      [name]: "",
    });

    checkoutR({
      type: CheckoutActions.updateAddress,
      payload: state,
    });
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" pt={2}>
      <TextField
        name="addressLine"
        label="Address Line"
        variant="outlined"
        size="small"
        fullWidth
        required
        value={state.addressLine}
        error={error.addressLine}
        helperText={error.addressLine}
        onChange={handleInputChange}
      />
      <Box pt={2} display="flex" width="100%">
        <TextField
          name="area"
          label="Area"
          variant="outlined"
          size="small"
          fullWidth
          required
          value={state.area}
          error={error.area}
          helperText={error.area}
          onChange={handleInputChange}
        />
        <Box px={2} />
        <TextField
          name="city"
          label="City"
          variant="outlined"
          size="small"
          fullWidth
          required
          value={state.city}
          error={error.city}
          helperText={error.city}
          onChange={handleInputChange}
        />
      </Box>
      <Box pt={2} width="100%" display="flex">
        <TextField
          name="state"
          label="State"
          variant="outlined"
          size="small"
          fullWidth
          required
          value={state.state}
          error={error.state}
          helperText={error.state}
          onChange={handleInputChange}
        />
        <Box px={2} />
        <TextField
          name="pin"
          label="Pin Code"
          variant="outlined"
          size="small"
          fullWidth
          required
          value={state.pin}
          error={error.pin}
          helperText={error.pin}
          onChange={handleInputChange}
        />
      </Box>
    </Box>
  );
};

export default CartAddressFromCmp;
