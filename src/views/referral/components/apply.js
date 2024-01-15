import React, { useContext, useEffect } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { formatCurrency } from "../../../core/utils/formatter";
import { ReferralContext } from "../../../store/referral";
import { AuthContext } from "../../../store/auth";
import ReferralAction from "../../../store/referral/action";

const ApplyForReferral = (props) => {
  const [referralS, referralR] = useContext(ReferralContext);
  const [authS] = useContext(AuthContext);

  useEffect(() => {
    referralR({
      type: ReferralAction.checkReferral,
      payload: { userId: authS.user?._id },
    });
  }, [authS.user, referralR]);

  function applyForReferral() {
    referralR({
      type: ReferralAction.applyForReferral,
      payload: { userId: authS.user._id },
    });
  }

  if (referralS.isReferralAvailable)
    return (
      <Box pt={4}>
        <Typography variant="h5" color="textPrimary">
          Apply for Referral Code
        </Typography>
        <Typography variant="body1" color="textSecondary">
          You are eligible to get a referral code, and start referring your
          friends to earn commission upto {formatCurrency(700)} per referral.
        </Typography>
        <Box pt={2}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={applyForReferral}
          >
            apply
          </Button>
        </Box>
      </Box>
    );

  return null;
};

export default ApplyForReferral;
