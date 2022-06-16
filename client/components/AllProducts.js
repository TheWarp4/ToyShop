import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {FaShoppingCart} from 'react-icons/fa'

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

  const handleATC = async (id) => {
    try {
    console.log('ADDED TO CART!', id)
    const res = await axios.post('/api/shoppingcarts', {
      user: 1,
      itemQuantity: 1,
      productId: id,
    })
    console.log(res)
  }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(getProducts, []);

  return (
    <div className="allProducts">
      {products.map((product, i) => {
        return (
            <div className="product-info" key={i}>
            <img className= 'products-photo' src={product.image} onClick = {() => {location.href = `/products/${product.id}`}} />
              <div>{product.productName}</div>
              <div>${product.price}</div>
              <button onClick={() => {handleATC(product.id)}}>
                <FaShoppingCart />
                Add To Cart
                </button>
            </div>
        );
      })}
    </div>
  );
};

export default AllProducts;
