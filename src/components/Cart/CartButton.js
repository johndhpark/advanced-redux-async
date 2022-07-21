import classes from "./CartButton.module.css";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {
  const cartCount = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();

  const cartClickHandler = () => dispatch(uiActions.toggleCart());

  return (
    <button onClick={cartClickHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartCount}</span>
    </button>
  );
};

export default CartButton;
