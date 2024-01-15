import WebClient from "../../core/axios/web-client";

const ProductMethods = {
	fetchProducts: async (filter) => {
		try {
			let query = "?";

			if (filter?.type && filter.type !== "all") query += `type=${filter.type}`;
			if (filter?.color && filter.color !== "all") query += `color=${filter.color}`;
			if (filter?.length && filter.length !== "all") query += `length=${filter.length}`;

			const response = await WebClient.get(`/api/product${query}`);
			return { data: response.data };
		} catch (error) {
			return { error: error.message };
		}
	},
};

export default ProductMethods;
