import { Box, Typography } from "@material-ui/core";
import React from "react";

const ReferralViewHead = (props) => {
	return (
		<Box pt={4}>
			<Typography variant="h5" color="textPrimary">
				My Referrals
			</Typography>
			<Typography variant="body1" color="textSecondary">
				Your referrals appear here, and you can request a transfer from here.
			</Typography>
		</Box>
	);
};

export default ReferralViewHead;
