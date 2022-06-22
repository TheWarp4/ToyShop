import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

function GuestPayment(props) {

  const fetchCartFromLocalStorage = JSON.parse(window.localStorage.getItem('cart') || '[]')
  const [cart, setCart] = useState(fetchCartFromLocalStorage);
  const [total, setTotal] = useState(0.00);


  const handleOrderStatusChange = async (userId, event) => {
    try {
      event.preventDefault();
      await axios.put(`/api/ordersessions/${userId}`, {
        status: 'completed',
      });
      await axios.post(`/api/ordersessions/${userId}`);
      props.history.push("/checkout/order-complete")
    }

    catch (error){
      console.log(error)
    }
  }

  const sumTotal = (arr) => {
    setTotal(arr.reduce((accum, element) => {
      return accum += element.price*element.itemQuantity
    }, 0))
  }

  useEffect(() => {
    sumTotal(cart)
  }, [cart])

  return (
<div id="gc-container">
      <div className="container-left">
        <form
          method="POST"
          action="/checkout/order-complete"
          >
        <div className="gc-payment-title">Payment</div>
          <input
            className="gc-card-number"
            placeholder="Card Number"
            type="text"
            minLength='15'
            maxLength='16'
            required
          />
        <input
          className="gc-nameoncard-input"
          placeholder="Name on Card"
          type="text"
          required
        />
        <div className="gc-exp-cvc-input">
          <input
            className="gc-exp-input"
            placeholder="Expiration Date"
            type="text"
            required
            minLength='4'
            maxLength='6'
          ></input>
          <input
            className="gc-CVC-input"
            placeholder="Security Code"
            type="text"
            required
            minLength='3'
            maxLength='4'
          />

        </div>
          <input type='submit' value='Pay Now' className="gc-payment-btn" ></input>
        </form>
      </div>


      <hr className="gc-container-divider"/>


      <div className="container-right">
        <div className="gc-shopping-cart">Shopping Cart</div>
            {cart.map((product, i) => (
              <div key={i}>
              <div className="gc-product-container">
                <img className= 'gc-product-photo' src = {product.image}/>
                <div>
                {product.productName}
                </div>
                <div>
                  ${product.price*product.itemQuantity}
                </div>
              </div>
              <hr/>
              </div>
            ))}
            <div id="gc-subtotal-total-price">
              <div>Subtotal</div>
            <div>${total.toFixed(2)}</div>
            </div>
            <hr/>
            <div id="gc-subtotal-total-price">
              <div>Shipping</div>
            <div>FREE</div>
            </div>
            <hr/>
            <div id="gc-subtotal-total-price">
              <div>Total</div>
            <div>${total.toFixed(2)}USD</div>
            </div>

      </div>
    </div>
  );
}
const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};
export default connect(mapState)(GuestPayment);

