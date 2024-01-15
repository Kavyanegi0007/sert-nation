import { loadScript } from "./general";

export async function displayRazorpay(user, rzpOrder, cleanup) {
	const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

	if (!res) {
		alert("Failed to open payment page, please check your internet.");
		return;
	}

	const options = {
		key: rzpOrder.key,
		amount: rzpOrder.amount,
		currency: rzpOrder.currency,
		name: rzpOrder.name,
		order_id: rzpOrder.orderId,
		handler: function (response) {
			cleanup();
		},
		prefill: {
			name: user.name,
			email: user.email,
			contact: user.phone,
		},
	};

	const paymentObject = window.Razorpay(options);
	paymentObject.open();
}
