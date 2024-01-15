const OrderAction = {
	getOrders: 1,
	addToList: 2,
	updateInList: 3,

	updateState: 4,

	cancelOrder: 5,
	returnOrder: 6,
};

Object.freeze(OrderAction);

export default OrderAction;
