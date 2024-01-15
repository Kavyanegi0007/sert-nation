import { createContext, useCallback, useReducer } from "react";
import ProductAction from "./action";
import ProductMethods from "./methods";
import ProductReducer from "./reducer";

const initialState = {
	loading: true,
	hasError: true,
	products: [],
	filters: {
		type: "all",
		color: "all",
		length: "all",
	},
};

const ProductStore = ({ children }) => {
	const [state, dispatch] = useReducer(ProductReducer, initialState);

	const customDispatch = useCallback(async (action) => {
		const { payload, type } = action;

		switch (type) {
			case ProductAction.fetchProducts: {
				dispatch({ type: ProductAction.setError, payload: false });
				dispatch({ type: ProductAction.setLoading, payload: true });
				const { data, error } = await ProductMethods.fetchProducts(payload);
				if (error) dispatch({ type: ProductAction.setError, payload: true });
				else {
					dispatch({ type: ProductAction.setError, payload: false });
					dispatch({ type: ProductAction.addToList, payload: data });
				}
				dispatch({ type: ProductAction.setLoading, payload: false });
				break;
			}

			case ProductAction.updateFilter: {
				const filter = { ...state.filters, ...payload };
				dispatch({ type: ProductAction.saveFilter, payload: filter });
				customDispatch({ type: ProductAction.fetchProducts, payload: filter });
				break;
			}
			default:
				dispatch(action);
		}
	}, []);

	return (
		<ProductContext.Provider value={[state, customDispatch]}>{children}</ProductContext.Provider>
	);
};

export const ProductContext = createContext(initialState);
export default ProductStore;
