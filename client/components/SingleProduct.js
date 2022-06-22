import React, { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
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
      <div>
        <div className="single-product-info">{product.productName}</div>
        <div>Category: {product.category}</div>
        <div>{product.description}</div>
        <div>
          Price: $ <b className="single-product-info">{product.price}</b>
        </div>
      </div>
      {props.userType !== "admin" || (
        <div>
          <DeleteProduct product={product} history={props.history} />
          <EditProduct product={product} />
        </div>
      )}
    </div>
  );
}

const mapState = (state) => {
  return {
    userType: state.auth.type,
  };
};

export default connect(mapState)(SingleProduct);
