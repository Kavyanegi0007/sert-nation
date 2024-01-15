import { Box } from "@material-ui/core";
import React from "react";
import AppFooterCmp from "../components/footer";
import NavBarCmp from "../components/nav-bar";
import AffiliateHeroCmp from "./components/hero";
import AffiliateMembershipsCmp from "./components/memberships";
import AffiliateStepsCmp from "./components/steps";
// import AffiliateTableCmp from "./components/table";

const AffiliateView = (props) => {
  return (
    <>
      <NavBarCmp />
      <Box>
        <AffiliateHeroCmp />
        <AffiliateStepsCmp />
        <AffiliateMembershipsCmp />
        {/* <AffiliateTableCmp /> */}
        <AppFooterCmp />
      </Box>
    </>
  );
};

export default AffiliateView;
