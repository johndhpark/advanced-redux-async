import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeItemHandler = (product) => dispatch(removeFromCart(product));

  const addItemHandler = (product) => dispatch(addToCart(product));

  const renderItems = cartItems.map((item) => (
    <CartItem
      key={item.id}
      item={item}
      onAddClick={addItemHandler}
      onRemoveClick={removeItemHandler}
    />
  ));

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{renderItems}</ul>
    </Card>
  );
};

export default Cart;
