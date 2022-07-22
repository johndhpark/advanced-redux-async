import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import uiReducer from "./ui-slice";
import productsReducer from "./products-slice";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		ui: uiReducer,
		products: productsReducer,
	},
});

export default store;
