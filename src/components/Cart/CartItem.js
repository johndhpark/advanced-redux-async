import classes from "./CartItem.module.css";

const CartItem = ({ item, onAddClick, onRemoveClick }) => {
  const { title, quantity, total, price } = item;

  const addButtonClickHandler = () => onAddClick(item);
  const removeButtonClickHandler = () => onRemoveClick(item);

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeButtonClickHandler}>-</button>
          <button onClick={addButtonClickHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
