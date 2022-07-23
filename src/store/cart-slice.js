import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	count: 0,
};

const fetchCart = createAsyncThunk(
	"carts/fetchCart",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(
				"https://redux-cart-86616-default-rtdb.firebaseio.com/carts.json"
			);

			if (!response.ok) throw new Error("Something went wrong");

			const data = await response.json();

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
			const idx = state.items.findIndex(
				(item) => item.id === action.payload.id
			);

			if (idx === -1) {
				state.items.push({
					...action.payload,
					quantity: 1,
					total: action.payload.price,
				});
			} else {
				state.items[idx].quantity += 1;
				state.items[idx].total += action.payload.price;
			}

			state.count += 1;
		},
		removeItem: (state, action) => {
			const idx = state.items.findIndex(
				(item) => item.id === action.payload.id
			);

			if (state.items[idx].quantity === 1) {
				state.items = state.items.filter(
					(item) => item.id !== action.payload.id
				);
			} else {
				state.items[idx].quantity -= 1;
				state.items[idx].total -= action.payload.price;
			}

			state.count -= 1;
		},
		extraReducers: (builder) => {
			builder
				.addCase(fetchCart.pending, (state, action) => {
					state.isLoading = true;
				})
				.addCase(fetchCart.fulfilled, (state, action) => {
					state.items = action.payload;
					state.isLoading = false;
					state.error = null;
				})
				.addCase(fetchCart.rejected, (state, action) => {
					state.items = [];
					state.isLoading = false;
					state.error = action.payload;
				});
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
