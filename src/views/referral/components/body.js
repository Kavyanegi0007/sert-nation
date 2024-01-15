import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  colors,
  useTheme,
} from "@material-ui/core";
import React, { useContext } from "react";
import { formatCurrency } from "../../../core/utils/formatter";
import { AuthContext } from "../../../store/auth";
import { ReferralContext } from "../../../store/referral";
import ReferralAction from "../../../store/referral/action";

const referrals = [
  {
    status: "active",
    createdAt: "2021-06-10T15:48:55+05:30",
    referredTo: { name: "Krishna Kumar" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "active",
    createdAt: "2021-06-05T15:48:55+05:30",
    referredTo: { name: "kavita kashyap" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "active",
    createdAt: "2021-06-01T15:48:55+05:30",
    referredTo: { name: "Gaurav" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "active",
    createdAt: "2021-06-01T15:48:55+05:30",
    referredTo: { name: "Tapish" },
    earned: 1672,
    commission: 2000,
  },
  {
    status: "active",
    createdAt: "2021-06-01T15:48:55+05:30",
    referredTo: { name: "Jatin" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "active",
    createdAt: "2021-06-01T15:48:55+05:30",
    referredTo: { name: "Gaurav" },
    earned: 1672,
    commission: 2000,
  },
  {
    status: "active",
    createdAt: "2021-05-30T15:48:55+05:30",
    referredTo: { name: "Arti Jain" },
    earned: 1330,
    commission: 2000,
  },
  {
    status: "active",
    createdAt: "2021-05-28T15:48:55+05:30",
    referredTo: { name: "dev k" },
    earned: 756,
    commission: 2000,
  },
  {
    status: "active",
    createdAt: "2021-05-28T15:48:55+05:30",
    referredTo: { name: "Akanshu Rawat" },
    earned: 2000,
    commission: 2000,
  },
  {
    status: "active",
    createdAt: "2021-05-27T15:48:55+05:30",
    referredTo: { name: "Rahul" },
    earned: 2000,
    commission: 2000,
  },
];

const holderName = "Raunaq Singh";

const ReferralViewBody = (props) => {
  const theme = useTheme();
  const [authS] = useContext(AuthContext);
  const [referralS] = useContext(ReferralContext);

  function getTotalEarning() {
    let total = 0;

    referrals.forEach((item) => {
      total += item.earned;
    });

    return total;
  }

  return (
    <Box pb={4} pt={4}>
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
        Active Referrals
      </Typography>
      <Typography variant="body1" color="textSecondary">
        These referral, have not reached full capacity yet. You may wait for
        these to fill up, or withdraw now also.
      </Typography>
      <Box>
        {/* {referralS.referrals
          .filter((item) => item.status === "active")
          .map((item, index) => (
            <Item referral={item} index={index} />
          ))} */}

        {referrals
          .filter((item) => item.status === "active")
          .map((item, index) => (
            <Item referral={item} index={index} />
          ))}
      </Box>
      <Box py={2} />
      <Typography variant="h6" color="textPrimary">
        Inactive Referrals
      </Typography>
      <Typography variant="body1" color="textSecondary">
        These referrals have reached full capacity. You may withdraw these now.
      </Typography>
      <Box>
        {/* {referralS.referrals
          .filter((item) => item.status === "inactive")
          .map((item, index) => (
            <Item referral={item} index={index} />
          ))} */}
        {referrals
          .filter((item) => item.status === "inactive")
          .map((item, index) => (
            <Item referral={item} index={index} />
          ))}
      </Box>
    </Box>
  );
};

const Item = ({ referral, index }) => {
  const [, referralR] = useContext(ReferralContext);
  const [authS] = useContext(AuthContext);

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
            {new Date(referral.createdAt).toLocaleDateString()}
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
        <Grid item xs={1} />
        <Grid item xs={5} md={2}>
          <Typography variant="body2" color="textSecondary">
            Earning
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {/* {formatCurrency(referral.earned)} / {formatCurrency(referralS.commission)} */}
            {formatCurrency(referral.earned)} /{" "}
            {formatCurrency(referral.commission)}
          </Typography>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={() =>
              referralR({
                type: ReferralAction.requestTransfer,
                payload: { id: referral._id, userId: authS.user._id },
              })
            }
          >
            <strong>withdraw</strong>
          </Button>
        </Grid>
      </Grid>
      <Box pt={2} width="100%">
        <Divider />
      </Box>
    </Box>
  );
};

export default ReferralViewBody;
