import { Box, CircularProgress, Container, Divider } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth";
import ReferralAction from "../../store/referral/action";
import TransferStore, { TransferContext } from "../../store/transfer";
import TransferAction from "../../store/transfer/action";
import AppFooterCmp from "../components/footer";
import NavBarCmp from "../components/nav-bar";
import TransferViewBody from "./components/body";
import TransferDetailsForm from "./components/details-form";
import TransferViewHead from "./components/head";

const TransferViewProvider = () => {
  return (
    <TransferStore>
      <TransferView />
    </TransferStore>
  );
};

const TransferView = (props) => {
  const [transferS, transferR] = useContext(TransferContext);
  const [authS] = useContext(AuthContext);

  useEffect(() => {
    transferR({
      type: TransferAction.getTransfers,
      payload: { userId: authS.user?._id },
    });
  }, [authS.user, transferR]);

  return (
    <>
      <NavBarCmp />
      <Box minHeight="calc(100vh - 48px)">
        {transferS.loading && (
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
          <TransferViewHead />
          <Box py={4}>
            <Divider />
          </Box>
          <TransferDetailsForm />
          <Box py={4}>
            <Divider />
          </Box>
          <TransferViewBody />
        </Container>
      </Box>
      <AppFooterCmp />
    </>
  );
};

export default TransferViewProvider;
