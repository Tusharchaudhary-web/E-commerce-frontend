import ProductCard from "./Productcard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import React from "react";

const Body = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/products", {
          withCredentials: true,
        });
  
        setProducts(res?.data?.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchingData();
  }, []);

  return (
    <div className="product">
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
};

export default Body;
