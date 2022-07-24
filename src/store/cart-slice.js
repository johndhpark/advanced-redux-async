import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialState = {
	items: [],
	isLoading: false,
	error: null,
	count: 0,
};

export const fetchCart = createAsyncThunk(
	"cart/fetchCart",
	async (_, thunkAPI) => {
		const { dispatch } = thunkAPI;

		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Fetching...",
				message: "Fetching cart data!",
			})
		);

		try {
			const response = await fetch(
				"https://redux-cart-86616-default-rtdb.firebaseio.com/cart.json"
			);

			if (!response.ok) throw new Error("Something went wrong");

			const data = await response.json();

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Fetched",
					message: "Successfully fetched cart data!",
				})
			);

			return data;
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Failed",
					message: "Failed to fetch cart data.",
				})
			);

			return error.message;
		}
	}
);

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async (newItem, thunkAPI) => {
		const { dispatch, getState } = thunkAPI;

		dispatch(cartActions.addItem(newItem));
		const state = getState();
		const { items, count } = state.cart;

		try {
			const response = await fetch(
				"https://redux-cart-86616-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					"Content-Type": "application/json",
					body: JSON.stringify({ items, count }),
				}
			);

			if (!response.ok) throw new Error("Something went wrong");
		} catch (error) {
			return error.message;
		}
	}
);

export const removeFromCart = createAsyncThunk(
	"cart/removeFromCart",
	async (product, thunkAPI) => {
		const { dispatch, getState } = thunkAPI;

		dispatch(cartActions.removeItem(product));

		const state = getState();
		const { items, count } = state.cart;

		try {
			const response = await fetch(
				"https://redux-cart-86616-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					"Content-Type": "application/json",
					body: JSON.stringify({ items, count }),
				}
			);

			if (!response.ok) throw new Error("Something went wrong");
		} catch (error) {
			return error.message;
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.items = action.payload.items ?? [];
				state.count = action.payload.count;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.items = [];
				state.count = 0;
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
