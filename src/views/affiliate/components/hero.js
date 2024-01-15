import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  Grid,
} from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import { AffiliateBg } from "../../../core/constants/image-locator";
import React from "react";

const AffiliateHeroCmp = (props) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  function handleClick() {
    window.scrollTo(0, window.innerHeight);
  }

  return (
    <Box
      minHeight="calc(100vh - 48px)"
      position="relative"
      style={{ background: `url(${AffiliateBg})`, backgroundSize: "cover" }}
    >
      <Container className="center">
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box>
              <Typography variant="h2" color="textPrimary">
                Start Earning Today
              </Typography>
              <Typography variant="h6" color="textPrimary">
                <Box fontFamily="Work Sans" fontWeight={400}>
                  Refer our products to your friends and earn 80% commission.
                </Box>
              </Typography>
              <Box pt={2} />
              <Button
                variant="contained"
                color="primary"
                disableElevation
                size="large"
                onClick={handleClick}
              >
                <strong>Learn more</strong>
                <ArrowRight />
              </Button>
            </Box>
          </Grid>
          {!isSm && (
            <Grid sm={3}>
              <Box width="100%" borderRadius={16}>
                <img
                  src="https://aws-s3-images.sertnation.com/misc/z-card.jpg"
                  alt=""
                  style={{ borderRadius: "inherit" }}
                />
              </Box>
              <Box width="100%" borderRadius={16} mt={4}>
                <img
                  src="https://aws-s3-images.sertnation.com/misc/x-card.jpg"
                  alt=""
                  style={{ borderRadius: "inherit" }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default AffiliateHeroCmp;
