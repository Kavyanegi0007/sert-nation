import { Box, Typography } from "@material-ui/core";
import React from "react";

const TransferViewHead = (props) => {
	return (
		<Box pt={4}>
			<Typography variant="h5" color="textPrimary">
				My Transfers
			</Typography>
			<Typography variant="body1" color="textSecondary">
				Your transfers appear here. It generally takes 3-4 days for a transfer to happen.
			</Typography>
		</Box>
	);
};

export default TransferViewHead;
