import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://redux-cart-86616-default-rtdb.firebaseio.com/products.json"
        );

        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const addToCartHandler = (product) => {
    dispatch(cartActions.addItem(product));
  };

  const renderProducts = products.map((product) => (
    <ProductItem
      key={product.id}
      product={product}
      onButtonClick={addToCartHandler}
    />
  ));

  if (isLoading) {
    return <h3>Loading...</h3>;
  } else if (!isLoading && products.length > 0) {
    return (
      <section className={classes.products}>
        <h2>Buy your favorite products</h2>
        <ul>{renderProducts}</ul>
      </section>
    );
  } else if (!isLoading && error) {
    return <p>{error}</p>;
  }

  return <p>There are no products to show</p>;
};

export default Products;
