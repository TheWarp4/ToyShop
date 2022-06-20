import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import state from "../../public/states";

function GuestCheckout() {

  const fetchCartFromLocalStorage = JSON.parse(window.localStorage.getItem('cart') || '[]')
  const [cart, setCart] = useState(fetchCartFromLocalStorage);
  const [total, setTotal] = useState(0.00);

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
        <div className="gc-contactinfo-prevuser">
          <div>Contact Information</div>
          <Link to="/login">Already Have an Account? Log in</Link>
        </div>
        <input
          className="gc-email-input"
          placeholder="Email"
          type="text"
        ></input>
        <div className="gc-shipping-address-title">Shipping Address</div>
        <div className="gc-name-input">
          <input
            className="gc-first-name"
            placeholder="First name"
            type="text"
          ></input>
          <input
            className="gc-last-name"
            placeholder="Last name"
            type="text"
          ></input>
        </div>
        <input
          className="gc-address-input"
          placeholder="Address"
          type="text"
        ></input>
        <input
          className="gc-address-line2-input"
          placeholder="Apartment, suite, etc. (optional)"
          type="text"
        ></input>
        <input className="gc-city-input" placeholder="City" type="text"></input>
        <div className="gc-country-state-zip-input">
          <select id="gc-country-input" name="country" type="text">
            <option>United States</option>
          </select>
          <select id="gc-state-input" type="text">
            <option>State</option>
            {state.map((state, i) => (
              <option key={i}>{state}</option>
            ))}
          </select>
          <input
            id="gc-zipcode-input"
            placeholder="ZIP Code"
            type="text"
          ></input>
        </div>
        <input
          className="gc-phone-input"
          placeholder="Phone"
          type="text"
        ></input>
      </div>
      <hr className="gc-container-divider"/>
      <div className="container-right">
        <div className="gc-shopping-cart">Shopping Cart</div>
            {cart.map((product, i) => (
              <div key={i}>
              <div  className="gc-product-container">
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
              <div>Total</div>
            <div>${total.toFixed(2)}USD</div>
            </div>

      </div>
    </div>
  );
}

export default GuestCheckout;
