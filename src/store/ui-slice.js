import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cartOpen: false,
	notification: null,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleCart(state) {
			state.cartOpen = !state.cartOpen;
		},
		showNotification(state, action) {
			console.log("hello");
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
