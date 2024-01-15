import {
	Box,
	Drawer,
	IconButton,
	Tooltip,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import {
	AccountBalanceWallet,
	FileCopy,
	ListAlt,
	Menu,
	PlayCircleFilled,
	PowerSettingsNew,
	SwapHoriz,
	Input,
	Store,
	SwapCalls,
	ShoppingCart,
} from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../store/auth";
import AuthAction from "../../../../store/auth/action";
import Routes from "../../../routes/routes";

const NavBarMenuXsCmp = (props) => {
	const history = useHistory();
	const [authS, authR] = useContext(AuthContext);
	const [show, setShow] = useState(false);

	return (
		<Box>
			<IconButton onClick={() => setShow(true)}>
				<Menu />
			</IconButton>
			<Drawer anchor="right" open={show} onClose={() => setShow(!show)}>
				<Box width={300}>
					<List>
						{authS.isLoggedIn ? (
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
											<Typography variant="body1">{authS.user.referralCode}</Typography>
										</Box>
										<Tooltip title="Copy to clipboard">
											<IconButton
												onClick={() => navigator.clipboard.writeText(authS.user.referralCode)}
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
												https://sertnation.com/referral-link/{authS.user.referralCode}
											</Typography>
										</Box>
										<Tooltip title="Copy to clipboard">
											<IconButton
												onClick={() =>
													navigator.clipboard.writeText(
														`https://sertnation.com/referral-link/${authS.user.referralCode}`,
													)
												}
											>
												<FileCopy />
											</IconButton>
										</Tooltip>
									</Box>
								)}
							</Box>
						) : (
							<ListItem
								button
								onClick={() =>
									history.push({
										pathname: Routes.login.path,

										search: "?from=" + history.location.pathname,
									})
								}
							>
								<ListItemIcon>
									<Input />
								</ListItemIcon>
								<ListItemText primary="Login / Signup" />
							</ListItem>
						)}
						<Box py={1}>
							<Divider />
						</Box>
						<ListItem button onClick={() => history.push(Routes.shop.path)}>
							<ListItemIcon>
								<Store />
							</ListItemIcon>
							<ListItemText primary="Shop" />
						</ListItem>
						<ListItem button onClick={() => history.push(Routes.affiliate.path)}>
							<ListItemIcon>
								<SwapCalls />
							</ListItemIcon>
							<ListItemText primary="Affiliate" />
						</ListItem>
						<ListItem button onClick={() => history.push(Routes.cart.path)}>
							<ListItemIcon>
								<ShoppingCart />
							</ListItemIcon>
							<ListItemText primary="Cart" />
						</ListItem>
						<Box py={1}>
							<Divider />
						</Box>
						{authS.isLoggedIn && (
							<>
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
							</>
						)}
					</List>
				</Box>
			</Drawer>
		</Box>
	);
};

export default NavBarMenuXsCmp;
