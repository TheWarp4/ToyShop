import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const Cart = (props) => {

  const [shoppingCart, setShoppingCart] = useState([]);

  const fetchShoppingCart = async (userId) => {
    try {
      const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`)
      const {data} = await axios.get(`/api/shoppingcarts/${getOrderSessionId.data.id}`)
      data.map( async (prodData) => {
        const productInfo = await axios.get(`/api/products/${prodData.productId}`)
        setShoppingCart(prevCart => [...prevCart, productInfo.data.singleProduct])
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.userId) fetchShoppingCart(props.userId);
  }, [props.userId])

  return (
    <div>
      <h1 className='cart-title'>Shopping Cart</h1>
      <div className="shopping-cart">
        {shoppingCart.map((product) => (
          <div key = {product.id}>
            <div className="product-info-container">
              <img className= 'sc-photo' src = {`${product.image}`}
                onClick={() => {
                  location.href = `/products/${product.id}`;
                }}
                />
              <div className="product-details">
              <div className="sc-product-name">{product.productName}</div>
              </div>
              <div>${product.price}</div>
              <button className="delete-sc-item">X</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
  };
};

export default connect(mapState)(Cart);
