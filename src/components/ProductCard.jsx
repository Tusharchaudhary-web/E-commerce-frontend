import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import React from "react";

const ProductCard = (props) => {
  const { name, description, price, image } = props.product;

  const dispatch = useDispatch();

  const handleAddItems = () => {
  
    dispatch(addItem(props.product));

  };

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={CDN_URL + image}
        alt="product-card-image"
      />
      <h2 className="product-name">{name}</h2>
      <p className="product-description">{description}</p>
      <p className="product-price">₹{price}</p>
      <div>
        <button className="product-btn" onClick={handleAddItems}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
