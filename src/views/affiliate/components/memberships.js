import {
  Box,
  Button,
  colors,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../store/auth";
import Routes from "../../routes/routes";

const AffiliateMembershipsCmp = (props) => {
  const theme = useTheme();
  const history = useHistory();
  const [authS] = useContext(AuthContext);
  // const [state, setState] = useState({ loading: false, error: false });

  return (
    <Box py={{ xs: 4, md: 8 }}>
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" color="textPrimary">
            Sert Memberships
          </Typography>
          <Box pt={2} />
          <Box width="100%">
            <Typography variant="body1">
              Sert Nation provides an affiliate membership program in which we
              provide our customers an opportunity to refer and earn. Apart from
              an opportunity to earn, we also provide other benifits to Sert
              Members, like:
            </Typography>
            <Box
              pt={{ xs: 1, md: 2 }}
              pb={{ xs: 2, md: 4 }}
              pl={{ xs: 2, md: 4 }}
            >
              <Typography>
                1. Ability to refer our products to your friends and earn
                commission on each sale you make.
              </Typography>
              <Typography>2. Special coupons and deals</Typography>
              <Typography>3. Early access to sales on our website</Typography>
              <Typography>
                4. Access to other benifits like exclusive invitation to Sert
                Nation offline events, free occassional goodies, etc.
              </Typography>
            </Box>
            <Typography variant="h6">Comparision of 2 memberships</Typography>
            <Typography variant="body1">
              We present a comprehensive comparision of both Sert Nation
              Memberships
            </Typography>
            <Box pt={4} />
            <TableContainer
              component={Box}
              bgcolor={theme.palette.primary.main}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      Feature
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontWeight: 700,
                        backgroundColor: colors.grey[900],
                        color: theme.palette.primary.main,
                      }}
                    >
                      SERT X
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontWeight: 700,
                        backgroundColor: colors.grey[900],
                        color: theme.palette.primary.main,
                      }}
                    >
                      SERT Z
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>How to get?</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: "#FFF",
                        borderRight: "1px solid " + colors.grey[300],
                      }}
                    >
                      Buy from Sert Shop for ₹2000 or more.
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ backgroundColor: "#FFF" }}
                    >
                      Buy from Sert Nation Video course worth ₹2499
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Commission per referral</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: "#FFF",
                        borderRight: "1px solid " + colors.grey[300],
                      }}
                    >
                      ₹700
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ backgroundColor: "#FFF" }}
                    >
                      ₹2000
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Commission on Video Course</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: "#FFF",
                        borderRight: "1px solid " + colors.grey[300],
                      }}
                    >
                      28%
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ backgroundColor: "#FFF" }}
                    >
                      80%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Commission on Shop Products</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: "#FFF",
                        borderRight: "1px solid " + colors.grey[300],
                      }}
                    >
                      35%
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ backgroundColor: "#FFF" }}
                    >
                      35%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Regular coupons?</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: "#FFF",
                        borderRight: "1px solid " + colors.grey[300],
                      }}
                    >
                      Yes
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ backgroundColor: "#FFF" }}
                    >
                      Yes
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Unlimited Referrals</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: "#FFF",
                        borderRight: "1px solid " + colors.grey[300],
                      }}
                    >
                      Yes
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ backgroundColor: "#FFF" }}
                    >
                      Yes
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Lifetime Availability</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: "#FFF",
                        borderRight: "1px solid " + colors.grey[300],
                      }}
                    >
                      Yes
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ backgroundColor: "#FFF" }}
                    >
                      Yes
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Take an action</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: "#FFF",
                        borderRight: "1px solid " + colors.grey[300],
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        size="small"
                        onClick={() => history.push(Routes.shop.path)}
                      >
                        <strong>got to shop</strong> <ArrowRight />
                      </Button>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ backgroundColor: "#FFF" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        size="small"
                        onClick={() => history.push(Routes.video.path)}
                      >
                        <strong>buy video course</strong> <ArrowRight />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box pt={6} />
            <Typography variant="h6">
              The complete money earning process
            </Typography>
            <Box
              pt={{ xs: 1, md: 2 }}
              pb={{ xs: 2, md: 2 }}
              pl={{ xs: 2, md: 4 }}
            >
              <Typography>1. Get Sert Nation Membership</Typography>
              <SubBox>
                <Typography variant="body2">
                  a. For Sert X, purhcase products from Sert Shop worth ₹2000 or
                  more, and then activate your membership from referral page
                </Typography>
                <Typography variant="body2">
                  b. For Sert Z, purhcase Sert Nation Video Course on must
                  needed modern skills worth ₹2499, and your membership will get
                  activated automatically.
                </Typography>
              </SubBox>
              <Typography>2. Share your referral code</Typography>
              <SubBox>
                <Typography variant="body2">
                  a. Access your referral code from the sidebar and share to
                  your friends. Make sure they sign-up using your referral code
                </Typography>
                <Typography variant="body2">
                  b. You will get commissions only when a user registers using
                  your referral code.
                </Typography>
                <Typography variant="body2">
                  c. When your referral buys something from our website, you get
                  commission.
                </Typography>
              </SubBox>
              {/* <Typography>3. View your referrals</Typography> */}
              {/* <SubBox>
                <Typography variant="body2">
                  View all your referrals in the referrals tab in your sidebar.
                  Here you will be able see all your referrals. For every
                  referral, there will be a journey which is as follows:
                  <br />
                  <br />
                  <strong>1. Active:</strong> When you refer someone and they
                  make a purchase, you recieve commission. For example, in Sert
                  X, you referred someone, and got ₹500 as referral amount, but
                  your limit in Sert X is ₹700, so you may recieve ₹200 more
                  commission if more sale is made corresponding to same
                  referral. Note that ₹700 is limit for one referral, you may
                  refer as many people you want and earn maximum limit from each
                  of them.
                  <br />
                  <br />
                  <strong>2. Inactive:</strong> When your referral reaches
                  maximum limit of your membership, your referral reaches
                  'inactive' state, indicating that no more commission can be
                  earned from this referral. You may withdraw a referral as soon
                  as it reaches inactive state. Note: You may also withdraw
                  active referrals also, but after withdrawing, no more
                  commission will be added to it, and it will shown in
                  'withdraw' status.
                  <br />
                  <br />
                  <strong>3. Withdraw:</strong> Referrals requested for withrawl
                  appear under this status, and you will recieve this amount in
                  your bank account within 1 day of requesting withdrawl.
                  <br />
                  <br />
                  <strong>3. Closed:</strong> Referrals which are successfully
                  withdrawn by you appear in this status category. These are
                  your past referral, something which you will be proud of.
                </Typography>
              </SubBox> */}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const SubBox = ({ children }) => {
  return (
    <Box py={1} pl={{ xs: 2, md: 4 }}>
      {children}
    </Box>
  );
};

export default AffiliateMembershipsCmp;
