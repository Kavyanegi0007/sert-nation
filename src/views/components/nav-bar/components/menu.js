import {
  Divider,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Tooltip,
  Link,
  useTheme,
} from "@material-ui/core";
import { Box } from "@material-ui/core";
import {
  AccountBalanceWallet,
  FileCopy,
  ListAlt,
  Person,
  PlayCircleFilled,
  PowerSettingsNew,
  ShoppingCart,
  SwapHoriz,
} from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../store/auth";
import AuthAction from "../../../../store/auth/action";
import { CheckoutContext } from "../../../../store/checkout";
import Routes from "../../../routes/routes";

const NavBarMenuCmp = (props) => {
  const theme = useTheme();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [authS, authR] = useContext(AuthContext);
  const [checkoutS] = useContext(CheckoutContext);

  return (
    <Box display="flex" alignItems="center">
      <Button
        onClick={() => history.push(Routes.shop.path)}
        style={{ fontSize: 14, textTransform: "capitalize" }}
      >
        shop
      </Button>
      <Button
        onClick={() => history.push(Routes.video.path)}
        style={{ fontSize: 14, textTransform: "capitalize" }}
      >
        video course
      </Button>
      <Button
        onClick={() => history.push(Routes.affiliate.path)}
        style={{ fontSize: 14, textTransform: "capitalize" }}
      >
        affiliate program
      </Button>
      <Box position="relative">
        <IconButton
          color="inherit"
          onClick={() => history.push(Routes.cart.path)}
        >
          <ShoppingCart fontSize="small" />
        </IconButton>
        {checkoutS.cart.order.length > 0 && (
          <Box
            position="absolute"
            top={0}
            right={0}
            bgcolor={theme.palette.primary.main}
            height={16}
            width={16}
            color="#FFF"
            borderRadius={16}
          >
            <Typography variant="caption" className="center">
              <strong>{checkoutS.cart.order.length}</strong>
            </Typography>
          </Box>
        )}
      </Box>
      <IconButton
        color="inherit"
        onClick={() => {
          if (authS.isLoggedIn) {
            setShow(true);
          } else {
            history.push({
              pathname: Routes.login.path,
              search: "?from=" + history.location.pathname,
            });
          }
        }}
      >
        <Person fontSize="small" />
      </IconButton>
      <Drawer anchor="right" open={show} onClose={() => setShow(!show)}>
        <Box width={350}>
          <List>
            {authS.user && (
              <Box px={2} py={2}>
                <Typography variant="body2" color="textSecondary">
                  Account Details
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  <strong>{authS.user.name}</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {authS.user.email}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {authS.user.phone}
                </Typography>
                {authS.user.referralCode && (
                  <Box pt={2} display="flex">
                    <Box flexGrow={1}>
                      <Typography variant="body2" color="textSecondary">
                        Referral Code
                      </Typography>
                      <Typography variant="body1">
                        {authS.user.referralCode}
                      </Typography>
                    </Box>
                    <Tooltip title="Copy to clipboard">
                      <IconButton
                        onClick={() =>
                          navigator.clipboard.writeText(authS.user.referralCode)
                        }
                      >
                        <FileCopy />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                {authS.user.referralCode && (
                  <Box pt={2} display="flex">
                    <Box flexGrow={1}>
                      <Typography variant="body2" color="textSecondary">
                        Referral Link
                      </Typography>
                      <Typography variant="body1">
                        https://sertnation.com/referral-link/
                        {authS.user.referralCode}
                      </Typography>
                    </Box>
                    <Tooltip title="Copy to clipboard">
                      <IconButton
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `https://sertnation.com/referral-link/${authS.user.referralCode}`
                          )
                        }
                      >
                        <FileCopy />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            )}
            <Box py={1}>
              <Divider />
            </Box>
            <ListItem button onClick={() => history.push(Routes.order.path)}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button onClick={() => history.push(Routes.video.path)}>
              <ListItemIcon>
                <PlayCircleFilled />
              </ListItemIcon>
              <ListItemText primary="Videos" />
            </ListItem>
            <ListItem button onClick={() => history.push(Routes.referral.path)}>
              <ListItemIcon>
                <AccountBalanceWallet />
              </ListItemIcon>
              <ListItemText primary="Referrals" />
            </ListItem>
            <ListItem button onClick={() => history.push(Routes.transfer.path)}>
              <ListItemIcon>
                <SwapHoriz />
              </ListItemIcon>
              <ListItemText primary="Transfers" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                authR({ type: AuthAction.logout });
                setShow(false);
              }}
            >
              <ListItemIcon>
                <PowerSettingsNew />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBarMenuCmp;
