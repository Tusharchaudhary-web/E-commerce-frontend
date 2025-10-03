import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} from "../utils/cartSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/order",
        { firstName, lastName, address, items: cartItems },
        { withCredentials: true }
      );

      console.log(res);
      setSuccessMessage(
        "✅ 🎉 Congratulations! Your order has been placed successfully! 🎊🛍️🍕☕"
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      dispatch(clearCart());

      setFirstName("");
      setLastName("");
      setAddress("");
    } catch (err) {
      setError(err?.response?.data?.message);
      setSuccessMessage("❌ Failed to place order. Please try again.");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <>
      <div className="cart">
        {cartItems.length === 0 ? (
          <p className="empty-cart">
            Nothing here… yet! Start adding goodies 🍕🍰
          </p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <h2>Item: {item.name}</h2>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  className="dec-btn"
                  onClick={() => dispatch(decrementQuantity({ id: item.id }))}
                >
                  -
                </button>
                <button
                  className="inc-btn"
                  onClick={() => dispatch(incrementQuantity({ id: item.id }))}
                >
                  +
                </button>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeItem({ id: item.id }))}
                >
                  Remove
                </button>
              </div>
            ))}

            <button className="clear-btn" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </button>

            <hr />
            <h2>Total Price: ₹{totalPrice}</h2>

            <form onSubmit={submitHandler}>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                // required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                // required
              />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                // required
              />
              <button className="order-btn" type="submit">
                Place Order
              </button>
              <p className="error">{error}</p>
            </form>
          </>
        )}
      </div>

      {successMessage && <div className="success-msg">{successMessage}</div>}
    </>
  );
};

export default Cart;
