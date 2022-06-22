import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = (props) => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    category: "LEGOS",
    description: "",
  });
  const handleSubmit = async function (event) {
    try {
      let text = "Warning! Pressing OK will Change the product data to the included form details\nPress OK to confirm."
      if (confirm(text) == true) {
      event.preventDefault();
      // parse price to Int
      product.price = parseInt(product.price);

      const { data } = await axios.put(
        `/api/products/${props.product.id}`,
        product
      );
      setProduct({
        productName: "",
        price: 0,
        category: "",
        // image: "",
        description: "",
      });
    }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  return (
    <form id="product-form" className="single-form" onSubmit={handleSubmit}>
      <label htmlFor="productName"> Change Name:</label>
      <input
        name="productName"
        onChange={handleChange}
        value={product.productName}
      />

      <label htmlFor="price">Change Price:</label>
      <input name="price" onChange={handleChange} value={product.price} />

      <label htmlFor="category">Change Category:</label>
      <select name="category" onChange={handleChange} value={product.category}>
        <option value="LEGOS">LEGOS</option>
        <option value="TRANSFORMERS">TRANSFORMERS</option>
        <option value="JURASSIC">JURASSIC</option>
      </select>

      {/* <label htmlFor="image"></label>
      <input name="image" onChange={handleChange} value={product.image} /> */}

      <label htmlFor="description">Change Description:</label>
      <input
        name="description"
        onChange={handleChange}
        value={product.description}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default EditProduct;
