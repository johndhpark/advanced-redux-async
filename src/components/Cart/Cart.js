import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeItemHandler = (product) => {
    dispatch(cartActions.removeItem(product));
  };

  const addItemHandler = (product) => dispatch(cartActions.addItem(product));

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
