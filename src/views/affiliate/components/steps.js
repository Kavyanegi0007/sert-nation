import {
  Box,
  colors,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import {
  Everyone,
  HomeEarning,
  HomeShoppingBag,
} from "../../../core/constants/image-locator";

const AffiliateStepsCmp = (props) => {
  const theme = useTheme();

  return (
    <Box bgcolor={colors.grey[200]} py={{ xs: 4, md: 8 }}>
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" color="textPrimary">
            How to start Earning?
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ textAlign: "center" }}
          >
            Follow the following three simple steps to start making an income
            from Sert Nation by simply referring our products to your friends.
            We have referral program on every product ranging from apparels to
            video courses.
          </Typography>
          <Box pt={8} />
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Step
                title="Buy Sert Products"
                content="Buy our video courses or clothes and then you get a referral code. We have two Sert Memberships."
                index={1}
                color="transparent"
                icon={HomeShoppingBag}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Step
                title="Share Referral Code"
                content="Share your referral code with your friends and if they signup using your referral code and make a purchase, you get a commission."
                index={2}
                color="white"
                icon={Everyone}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Step
                title="Withdraw earnings"
                content="Withdraw all your earnings directly into your bank account with just one click."
                index={3}
                color={theme.palette.primary.main}
                icon={HomeEarning}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

const Step = ({ icon, title, content, index, color }) => {
  const Svg = icon;

  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={{ xs: 480, sm: 360, md: 440 }}
      px={8}
      bgcolor={color}
    >
      <Box position="absolute" top={16} right={16}>
        <Typography variant="h5" color="textPrimary">
          {index}
        </Typography>
      </Box>
      {Svg && (
        <Box height={120}>
          <Svg />
        </Box>
      )}
      <Box pt={4} />
      <Typography variant="h5" color="textPrimary" align="center">
        {title}
      </Typography>
      <Typography variant="body1" color="textPrimary" align="center">
        {content}
      </Typography>
    </Box>
  );
};

export default AffiliateStepsCmp;
