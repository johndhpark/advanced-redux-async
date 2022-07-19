import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const cartCount = useSelector((state) => state.cart.count);

  return (
    <button className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartCount}</span>
    </button>
  );
};

export default CartButton;
