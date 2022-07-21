import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const cartOpen = useSelector((state) => state.ui.cartOpen);

  return (
    <Layout>
      {cartOpen && <Cart />}
      <Products />}
    </Layout>
  );
}

export default App;
