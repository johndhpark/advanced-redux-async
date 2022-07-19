import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	count: 0,
};

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
				state.items.splice(idx, 1);
			} else {
				state.items[idx].quantity -= 1;
				state.items[idx].total -= action.payload.price;
			}

			state.count -= 1;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
