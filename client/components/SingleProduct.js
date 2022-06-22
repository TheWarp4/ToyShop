import React, { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { connect } from "react-redux";

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

  return (
    <div className="single-product">
      <img src={product.image} />
      <div>Name: {product.productName}</div>
      <div>Description: {product.description}</div>
      <div>Category: {product.category}</div>
      <div>Price: {product.price}</div>
      {props.userType !== "admin" || (
        <DeleteProduct product={product} history={props.history} />
      )}
      {props.userType !== "admin" || <EditProduct product={product} />}
    </div>
  );
}

const mapState = (state) => {
  return {
    userType: state.auth.type,
  };
};

export default connect(mapState)(SingleProduct);
