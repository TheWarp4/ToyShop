import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const Cart = (props) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [total, setTotal] = useState(0.00);

  const fetchShoppingCart = async (userId) => {
    try {
      const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`)
      const {data} = await axios.get(`/api/shoppingcarts/${getOrderSessionId.data.id}`)
      data.map( async (prodData) => {
        const productInfo = await axios.get(`/api/products/${prodData.productId}`)
        productInfo.data.singleProduct.itemQuantity = prodData.itemQuantity
        setShoppingCart(prevCart => [...prevCart, productInfo.data.singleProduct])
        setTotal(prevTotal => prevTotal + parseFloat(productInfo.data.singleProduct.price)*prodData.itemQuantity)
      })
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromShoppingCart = async (userId, productId) => {
    const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`)
    console.log(getOrderSessionId)
    const {data} = await axios.delete(`/api/shoppingcarts/${getOrderSessionId.data.id}/${productId}`)
    console.log(data)
  }

  const handleDecrement = async (userId, productId) => {
    const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`)
    console.log(getOrderSessionId)
    const {data} = await axios.put(`/api/shoppingcarts/${getOrderSessionId.data.id}/${productId}/decrement`, {itemQuantity: 1})
    console.log(data)
  }

  const handleIncrement = async (userId, productId) => {
    const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`)
    console.log(getOrderSessionId)
    await axios.put(`/api/shoppingcarts/${getOrderSessionId.data.id}/${productId}/increment`)
  }

  useEffect(() => {
    if (props.userId) {
      fetchShoppingCart(props.userId)
    }
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
                <div>
              <div className="sc-product-name">{product.productName}</div>
              <div className="sc-quantity">
                <button className="sc-incrementer" onClick={() => {handleDecrement(props.userId, product.id)}}>-</button>
                {product.itemQuantity}
                <button className="sc-incrementer" onClick={() => {handleIncrement(props.userId, product.id)}}>+</button>
                </div>
              </div>
              </div>
              <div>${product.price}</div>
              <button className="delete-sc-item"
                onClick={() => deleteFromShoppingCart(props.userId, product.id)}
              >X</button>
            </div>
            <hr className="sc-horizontal-line"/>
          </div>
        ))}
        <div className="sc-subtotal-checkout">
        <div className="sc-subtotal">SubTotal: ${total.toFixed(2)}</div>
        <button className="sc-checkout-btn"
        onClick={() => {
                location.href = `/checkout`;
              }}
              >
          Check Out
        </button>
        </div>
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
