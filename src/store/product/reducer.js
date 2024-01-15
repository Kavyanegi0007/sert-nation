import ProductAction from "./action";

const ProductReducer = (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case ProductAction.addToList:
			return {
				...state,
				products: [...state.products, ...payload],
			};

		case ProductAction.setLoading:
			return {
				...state,
				loading: payload,
			};

		case ProductAction.setError:
			return {
				...state,
				hasError: payload,
			};

		case ProductAction.saveFilter:
			return {
				...state,
				products: [],
				filters: { ...payload },
			};

		default:
			return state;
	}
};

export default ProductReducer;
