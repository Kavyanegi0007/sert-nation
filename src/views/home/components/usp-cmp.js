import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { HomeUsp } from "../../../core/constants/image-locator";

const HomeUspCmp = (props) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();

  return (
    <Box position="relative">
      <Container style={{ padding: 0 }}>
        <Box display="flex">
          <Box
            flexGrow={1}
            py={32}
            pr={{ xs: 2, md: 48 }}
            pl={{ xs: 2, md: 0 }}
          >
            <Typography variant="h3" color="textPrimary">
              Building Fashion For Everyone !
            </Typography>
            <Box pt={2} />
            <Typography variant="body1" color="textSecondary">
              Wearing trendy clothes no longer has to be a one sided trade.
              <br />
              Sert Nation rewards its family by allowing them to refer to other
              people using the affiliate programme.
              <br />
              <strong>Presenting The Real Affiliate</strong> where you can earn
              commission upto 80% by referring our products.
              <br />
              <br />
              Just follow the steps listed below to start your earning journey
            </Typography>
          </Box>
          <Box width={240} bgcolor={theme.palette.primary.main}></Box>
        </Box>
      </Container>
      {!isSm && (
        <Box position="absolute" bottom={0} right={64}>
          <Box height={240}>
            <img src={HomeUsp} alt="" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HomeUspCmp;
