import { Box, CircularProgress, Container } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth";
import ReferralStore, { ReferralContext } from "../../store/referral";
import ReferralAction from "../../store/referral/action";
import AppFooterCmp from "../components/footer";
import NavBarCmp from "../components/nav-bar";
import ApplyForReferral from "./components/apply";
import ReferralViewBody from "./components/body";
import ReferralViewHead from "./components/head";

const ReferralViewProvider = () => {
  return (
    <ReferralStore>
      <ReferralView />
    </ReferralStore>
  );
};

const ReferralView = (props) => {
  const [referralS, referralR] = useContext(ReferralContext);
  const [authS] = useContext(AuthContext);

  useEffect(() => {
    referralR({
      type: ReferralAction.getReferrals,
      payload: { userId: authS.user?._id },
    });
  }, [authS.user, referralR]);

  return (
    <>
      <NavBarCmp />
      <Box minHeight="calc(100vh - 48px)">
        {referralS.loading && (
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
        <Container>
          <ApplyForReferral />
          <ReferralViewHead />
          <ReferralViewBody />
        </Container>
      </Box>
      <AppFooterCmp />
    </>
  );
};

export default ReferralViewProvider;
