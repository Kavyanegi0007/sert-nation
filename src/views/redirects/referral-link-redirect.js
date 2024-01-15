import { Box, Typography, Button } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LogoBlack } from "../../core/constants/image-locator";
import LocalStorageKeys from "../../core/constants/local-storage-keys";
import Routes from "../routes/routes";

const ReferralLinkRedirect = (props) => {
	const history = useHistory();

	const getReferralCode = useCallback(() => {
		return history.location.pathname.split("/")[2];
	}, [history]);

	useEffect(() => {
		window.localStorage.setItem(LocalStorageKeys.referral, getReferralCode());
	}, [history, getReferralCode]);

	return (
		<Box height="100vh" width="100vw" position="relative">
			<Box
				className="center"
				width="100%"
				height="100%"
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
			>
				<Box height={32}>
					<img src={LogoBlack} alt="" />
				</Box>
				<Box pb={4}>
					<Typography color="textSecondary">
						<Box fontFamily="aldrich" fontWeight={400}>
							Fashion for Everyone
						</Box>
					</Typography>
				</Box>
				<Typography variant="h4" color="textPrimary">
					Applied Referral Code
				</Typography>
				<Typography variant="h6" color="textPrimary">
					{getReferralCode()}
				</Typography>
				<Box pt={4}>
					<Button
						variant="contained"
						color="primary"
						disableElevation
						onClick={() => history.replace(Routes.home.path)}
					>
						continue
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default ReferralLinkRedirect;
