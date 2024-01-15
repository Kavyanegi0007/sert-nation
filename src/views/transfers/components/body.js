import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  useTheme,
  colors,
} from "@material-ui/core";
import React, { useContext } from "react";
import { formatCurrency } from "../../../core/utils/formatter";
import { AuthContext } from "../../../store/auth";
import { ReferralContext } from "../../../store/referral";
import ReferralAction from "../../../store/referral/action";
import { TransferContext } from "../../../store/transfer";

const transfers = [
  {
    status: "closed",
    updatedAt: "2021-04-18T15:48:55+05:30",
    referredTo: { name: "Dakshit Mohan" },
    earned: 700,
    commission: 700,
  },
  {
    status: "closed",
    updatedAt: "2021-05-02T15:48:55+05:30",
    referredTo: { name: "Aman" },
    earned: 700,
    commission: 700,
  },
  {
    status: "closed",
    updatedAt: "2021-05-03T15:48:55+05:30",
    referredTo: { name: "Vibhu" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "closed",
    updatedAt: "2021-05-03T15:48:55+05:30",
    referredTo: { name: "kumar.saksam" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "closed",
    updatedAt: "2021-05-09T15:48:55+05:30",
    referredTo: { name: "amol gupta" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "closed",
    updatedAt: "2021-05-09T15:48:55+05:30",
    referredTo: { name: "pinky" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "closed",
    updatedAt: "2021-05-08T15:48:55+05:30",
    referredTo: { name: "Kedar Sharma" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "closed",
    updatedAt: "2021-05-07T15:48:55+05:30",
    referredTo: { name: "Vikram" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "withdraw",
    updatedAt: "2021-05-14T15:48:55+05:30",
    referredTo: { name: "shilpi" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "withdraw",
    updatedAt: "2021-05-17T15:48:55+05:30",
    referredTo: { name: "anonyMous" },
    earned: 2000,
    commission: 2000,
  },
];

const holderName = "Rishabh Jain";

const TransferViewBody = (props) => {
  const theme = useTheme();
  const [authS] = useContext(AuthContext);
  const [transferS] = useContext(TransferContext);

  function getTotalEarning() {
    let total = 0;

    transfers.forEach((item) => {
      total += item.earned;
    });

    return total;
  }

  return (
    <Box pb={4}>
      <Box
        position="sticky"
        top={40}
        bgcolor="#FFF"
        zIndex={100}
        boxShadow={theme.shadows[4]}
      >
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          bgcolor={colors.grey[200]}
          py={4}
          px={2}
        >
          <Box>
            <Typography variant="h5" color="textPrimary">
              {/* {authS.user?.name} */}
              {holderName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Account Holder
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="h5">
              {formatCurrency(getTotalEarning())}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Earning
            </Typography>
          </Box>
        </Box>
        <Divider />
      </Box>
      <Box pt={4} />
      <Typography variant="h6" color="textPrimary">
        Requested Transfers
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Your requested transfers will be made tranferred into your bank account
        within 3-4 days of request.
      </Typography>
      <Box>
        {transfers
          .filter((item) => item.status === "withdraw")
          .map((item, index) => (
            <Item referral={item} index={index} />
          ))}
      </Box>
      <Box py={2} />
      <Typography variant="h6" color="textPrimary">
        Successful transfers
      </Typography>
      <Typography variant="body1" color="textSecondary">
        These have been credited into your bank account.
      </Typography>
      <Box>
        {transfers
          .filter((item) => item.status === "closed")
          .map((item, index) => (
            <Item referral={item} index={index} />
          ))}
      </Box>
    </Box>
  );
};

const Item = ({ referral, index }) => {
  const [transferS] = useContext(TransferContext);

  return (
    <Box pt={4}>
      <Grid container spacing={1}>
        <Grid item xs={1} md={1}>
          <Typography variant="body1" color="textSecondary">
            {index + 1}
          </Typography>
        </Grid>
        <Grid item xs={5} md={3}>
          <Typography variant="body2" color="textSecondary">
            Date
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {new Date(referral.updatedAt).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="body2" color="textSecondary">
            Referred To{" "}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {referral.referredTo.name}
          </Typography>
        </Grid>
        <Grid item xs={1} md={1}></Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="body2" color="textSecondary">
            Amount
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {formatCurrency(referral.earned)}
          </Typography>
        </Grid>
        <Grid item xs={6} md={2}></Grid>
      </Grid>
      <Box pt={2} width="100%">
        <Divider />
      </Box>
    </Box>
  );
};

export default TransferViewBody;
