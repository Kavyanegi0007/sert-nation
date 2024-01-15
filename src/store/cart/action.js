const CartAction = {
	incQty: 1,
	decQty: 2,
	applyCoupon: 3,
	applyCredits: 4,
	updateAddress: 5,
	updatePaymentMode: 6,
	fetchCart: 7,

	syncCart: 8,
	changeSize: 9,
	removeFromCart: 10,
	updateCartState: 11,

	incQtyInCart: 12,
	decQtyInCart: 13,

	loadCartFromLocal: 14,
	changePaymentMode: 15,

	placeOrder: 16,
	updateOrderState: 17,
};

Object.freeze(CartAction);

export default CartAction;
