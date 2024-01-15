import { Box, Container, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth";
import OrderStore, { OrderContext } from "../../store/order";
import OrderAction from "../../store/order/action";
import AppFooterCmp from "../components/footer";
import NavBarCmp from "../components/nav-bar";
import OrderCard from "./components/order-card";

const OrderViewProvider = () => {
	return (
		<OrderStore>
			<OrderView />
		</OrderStore>
	);
};

const OrderView = (props) => {
	const [orderS, orderR] = useContext(OrderContext);
	const [authS] = useContext(AuthContext);

	useEffect(() => {
		orderR({ type: OrderAction.getOrders, payload: { userId: authS.user._id } });
	}, [authS.user, orderR]);

	return (
		<>
			<NavBarCmp />
			<Box minHeight="calc(100vh - 48px)">
				<Container>
					<Box pt={4}>
						<Typography variant="h5">My Orders</Typography>
					</Box>
					<Box pb={4}>
						{orderS.orders.map((item) => (
							<OrderCard order={item} />
						))}
					</Box>
				</Container>
			</Box>
			<AppFooterCmp />
		</>
	);
};

export default OrderViewProvider;
