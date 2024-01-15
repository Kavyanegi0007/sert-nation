import { Box, Container, CircularProgress, Typography, Button } from "@material-ui/core";
import React from "react";
import { OrderPlaced } from "../../core/constants/image-locator";
import NavBarCmp from "../components/nav-bar";

const OrderPlacedView = (props) => {
	return (
		<>
			<NavBarCmp />
			<Box height="calc(100vh - 48px)">
				<Container className="center">
					<Box display="flex" flexDirection="column" alignItems="center">
						<CircularProgress size={56} />
						<Box pt={2} />
						<Typography variant="body1">Waiting for confirmation ...</Typography>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default OrderPlacedView;
