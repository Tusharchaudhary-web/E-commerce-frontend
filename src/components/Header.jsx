import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import React from "react";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="header">
      <div>
        <img className="logo-url" src={LOGO_URL} />
      </div>
      <div>
        <Link to="/">
          <button className="home-btn">Home</button>
        </Link>
      </div>
      <div>
        <Link to="/cart">
          <button className="cart-btn">Cart : {cartItems.length}</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
