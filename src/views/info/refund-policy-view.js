import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import { formatCurrency } from "../../core/utils/formatter";

const RefundPolicyView = () => {
	window.document.title = "Refund Policy | Sert Nation";
	return (
		<Box pt={{ xs: 2, md: 4 }} minHeight="100vh">
			<Container>
				<Box>
					<Typography variant="h6">Refund And Cancellation Policy</Typography>
				</Box>
				<Box pt={{ xs: 2, md: 4 }}>
					<Typography variant="body1">
						Our focus is complete customer satisfaction. In the event, if you are displeased with
						the services provided, we will refund back the money, provided the reasons are genuine
						and proved after investigation. Please read the fine prints of each deal before buying
						it, it provides all the details about the services or the product you purchase.
						<br />
						<br />
						In case of dissatisfaction from our services, clients have the liberty to cancel their
						projects and request a refund from us. Our Policy for the cancellation and refund will
						be as follows:
						<br />
						<br />
						<strong>Cancellation Policy</strong>
						<br />
						<br />
						For cancellations, you may cancel a product from our website before it has been
						dispatched, after that no cancellation is allowed.
						<br />
						<br />
						<strong>Refund Policy</strong>
						<br />
						<br />
						We will try our best to create the suitable design concepts for our clients. In case any
						client is not completely satisfied with our products we can provide a refund.  Refunds
						will be generated in the form of SERT credits in the customer’s account in our website.
						A small refund fee of {formatCurrency(20)} will be charged in the form of refund
						processing fee.
					</Typography>
				</Box>
			</Container>
		</Box>
	);
};

export default RefundPolicyView;
