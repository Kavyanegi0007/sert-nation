import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { EmptyCart } from "../../../core/constants/image-locator";
import Routes from "../../routes/routes";

const EmptyCartCmp = (props) => {
	const history = useHistory();

	return (
		<Box height="calc(100vh - 48px)">
			<Box className="center" display="flex" flexDirection="column" alignItems="center">
				<Box height={320}>
					<EmptyCart />
				</Box>
				<Box pt={2} />
				<Typography variant="h6">You cart is empty</Typography>
				<Box pt={1} />
				<Button
					variant="outlined"
					color="primary"
					style={{ borderWidth: 2 }}
					onClick={() => history.push(Routes.shop.path)}
				>
					<strong>shop now</strong>
				</Button>
			</Box>
		</Box>
	);
};

export default EmptyCartCmp;
