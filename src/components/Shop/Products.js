import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart-slice.js";
import { fetchProducts } from "../../store/products-slice";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = () => {
  const { products, isLoading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
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
