import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([{}]);

  const getProducts = () => {
    try {
      (async () => {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      })();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(getProducts, []);

  return (
    <div className="allProducts">
      {products.map((product, i) => {
        return (
          <ul key={i}>
            <div>
              <Link to={`/products/${product.id}`}>More Details!</Link>

              <li>{product.productName}</li>
              <li>{product.price}</li>
              <img src={product.image} />
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default AllProducts;
