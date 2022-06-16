import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";

const AllProducts = (props) => {
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

  const handleAddToCart = async (userId, productId) => {
    try {
      console.log(userId, "userId");
      await axios.put(`/api/shoppingcarts/${userId}`, {
        productId,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(getProducts, []);

  return (
    <div className="allProducts">
      {products.map((product, i) => {
        return (
          <div className="product-info" key={i}>
            <img
              className="products-photo"
              src={product.image}
              onClick={() => {
                location.href = `/products/${product.id}`;
              }}
            />
            <div>{product.productName}</div>
            <div>${product.price}</div>
            <button
              onClick={() => {
                handleAddToCart(props.userId, product.id);
              }}
            >
              <FaShoppingCart />
              Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
  };
};

export default connect(mapState)(AllProducts);

// export default AllProducts;
