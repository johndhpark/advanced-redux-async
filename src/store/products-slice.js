import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async () => {
		try {
			const response = await fetch(
				"https://redux-cart-86616-default-rtdb.firebaseio.com/products.json"
			);

			if (!response.ok) throw new Error("Something went wrong");

			const data = await response.json();

			return data;
		} catch (error) {
			return error.message;
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.products = action.payload;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.products = [];
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default productsSlice.reducer;
