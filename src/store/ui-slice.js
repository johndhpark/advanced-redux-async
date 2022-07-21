import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cartOpen: false,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleCart: (state) => {
			state.cartOpen = !state.cartOpen;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
