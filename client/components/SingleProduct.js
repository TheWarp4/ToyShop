import React, { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";

function SingleProduct(props) {
  // LOCAL STATE
  const [product, setProduct] = useState({});

  // FETCH SINGLE PRODUCT AXIOS REQ
  const fetchProduct = async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data.singleProduct);
    } catch (error) {
      console.log(error);
    }
  };

  // USE EFFECT (OR COMPDIDMOUNT)
  useEffect(() => {
    fetchProduct(props.match.params.id);
  }, []);

  console.log("THIS IS PRODUCT", product);
  return (
    <div className="single-product">
      <img src={product.image} />
      <div>Name: {product.productName}</div>
      <div>Description: {product.description}</div>
      <div>Category: {product.category}</div>
      <div>Price: {product.price}</div>
    </div>
  );
}

export default SingleProduct;
