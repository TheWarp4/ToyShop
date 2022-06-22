import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const AddProduct = (props) => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    category: "",
    image: "",
    description: "",
  });

  const handleSubmit = async function (event) {
    try {
      event.preventDefault();
      const token = window.localStorage.getItem("token");
      await axios.post("/api/products", {
        authorization: token,
        product: product,
      });
      setProduct({
        productName: "",
        price: 0,
        category: "",
        image: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  return (
    props.userType !== "admin" || (
      <form id="product-form" onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          name="productName"
          onChange={handleChange}
          value={product.productName}
        />

        <label htmlFor="price">Price:</label>
        <input name="price" onChange={handleChange} value={product.price} />

        <label htmlFor="category">Category:</label>
        <select
          name="category"
          onChange={handleChange}
          value={product.category}
        >
          <option value="LEGOS">LEGOS</option>
          <option value="TRANSFORMERS">TRANSFORMERS</option>
          <option value="JURASSIC">JURASSIC</option>
        </select>

        <label htmlFor="image"></label>
        <input name="image" onChange={handleChange} value={product.image} />

        <label htmlFor="description">Description:</label>
        <input
          name="description"
          onChange={handleChange}
          value={product.description}
        />

        <button type="submit">Submit</button>
      </form>
    )
  );
};

const mapState = (state) => {
  return {
    userType: state.auth.type,
  };
};

export default connect(mapState)(AddProduct);
