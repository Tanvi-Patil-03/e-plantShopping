cat > src/CartItem.jsx <<'EOF'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseItem, decreaseItem, removeItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({onContinueShopping}) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce((sum,item) => sum + item.price * item.quantity,0);

  return (
    <main className="cart-container">
      <h1>Shopping Cart 🛒</h1>

      {cart.length === 0 ? (
        <h3>Your cart is empty!</h3>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img className="cart-item-image" src={item.image} alt={item.name}/>
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>

                <button onClick={() => dispatch(decreaseItem(item.id))}>−</button>
                <span> {item.quantity} </span>
                <button onClick={() => dispatch(increaseItem(item.id))}>+</button>

                <button className="cart-item-delete" onClick={() => dispatch(removeItem(item.id))}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          <h2>Total Amount: ₹{total}</h2>
          <button className="get-started-button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="get-started-button1" onClick={() => alert('Thank you for shopping at Paradise Nursery!')}>
            Checkout
          </button>
        </>
      )}
    </main>
  );
};

export default CartItem;
EOF