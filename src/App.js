import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCart } from "./store/cart-slice";

function App() {
	const uiState = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCart());
	}, [dispatch]);

	return (
		<>
			{uiState.notification && (
				<Notification
					title={uiState.notification.title}
					status={uiState.notification.status}
					message={uiState.notification.message}
				/>
			)}
			<Layout>
				{uiState.cartOpen && <Cart />}
				<Products />
			</Layout>
		</>
	);
}

export default App;
