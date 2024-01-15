import { Box, Button, Typography } from "@material-ui/core";
import React from "react";

const ErrorRetryCmp = ({ onClick }) => {
	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Typography variant="body1">Oops! This wasn't supposed to happen.</Typography>
			<Box pt={1} />
			<Button variant="outlined" color="primary" onClick={onClick}>
				retry
			</Button>
		</Box>
	);
};

export default ErrorRetryCmp;
