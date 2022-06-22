import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import state from "../../public/states";
import axios from "axios";
import { connect } from "react-redux";

function Checkout(props) {

  const fetchCartFromLocalStorage = JSON.parse(window.localStorage.getItem('cart') || '[]')
  const [cart, setCart] = useState(fetchCartFromLocalStorage);
  const [total, setTotal] = useState(0.00);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [emailValue, setEmailValue] = useState('')


const fetchLocalCart = () => {
  cart.map((localProduct) => {
    setShoppingCart(prevCart => [...prevCart, localProduct])
    setTotal(prevTotal => prevTotal + parseFloat(localProduct.price)*localProduct.itemQuantity)
  })
}

const handleSavingInfo = () => {
  localStorage.setItem("email", emailValue);

}


  const fetchShoppingCart = async (userId) => {
    try {
      const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`)
      const {data} = await axios.get(`/api/shoppingcarts/${getOrderSessionId.data.id}`)
      data.map( async (prodData) => {
        const productInfo = await axios.get(`/api/products/${prodData.productId}`)
        productInfo.data.singleProduct.itemQuantity = prodData.itemQuantity;
        setShoppingCart(prevCart => [...prevCart, productInfo.data.singleProduct])
        setTotal(prevTotal => prevTotal + parseFloat(productInfo.data.singleProduct.price)*prodData.itemQuantity)
      })

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchShoppingCart(props.userId)
    fetchLocalCart()

  }, [])

  return (
    <div id="gc-container">
      <div className="container-left">
        <div className="gc-contactinfo-prevuser">
          <div className="c-contact-info-title">Contact Information</div>
        </div>
        <form
        method="POST"
        action="/checkout/payment"
        onSubmit={(e) => {handleSavingInfo(e)}}
        >

        <input
          className="gc-email-input"
          placeholder="Email"
          type="email"
          required
          value={emailValue}
          onChange = {(e) => {
            setEmailValue(e.target.value)
          }}
        />

        <div className="gc-shipping-address-title">Shipping Address</div>
        <div className="gc-name-input">
          <input
            className="gc-first-name"
            placeholder="First name"
            type="text"
            required
          ></input>
          <input
            className="gc-last-name"
            placeholder="Last name"
            type="text"
            required
          ></input>
        </div>
        <input
          className="gc-address-input"
          placeholder="Address"
          type="text"
          required

        ></input>
        <input
          className="gc-address-line2-input"
          placeholder="Apartment, suite, etc. (optional)"
          type="text"
        ></input>
        <input className="gc-city-input" placeholder="City" type="text" required></input>
        <div className="gc-country-state-zip-input">
          <select id="gc-country-input" name="country" type="text">
            <option>United States</option>
          </select>
          <select id="gc-state-input" type="text" required>
            <option>State</option>
            {state.map((state, i) => (
              <option key={`gc-${i}`}>{state}</option>
            ))}
          </select>
          <input
            id="gc-zipcode-input"
            placeholder="ZIP Code"
            type="text"
            minLength='5'
            maxLength='5'

            required
          ></input>
        </div>
        <input
          className="gc-phone-input"
          placeholder="Phone"
          type="tel"
          minLength='10'
            maxLength='11'
          required
        ></input>
        <a href="/checkout/payment">
          <input type='submit' value='Continue to Payment' className="gc-payment-btn" ></input>
        </a>
        </form>
      </div>

      <hr className="gc-container-divider"/>

      <div className="container-right">
        <div className="gc-shopping-cart">Shopping Cart</div>
            {shoppingCart.map((product, i) => (
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

export default connect(mapState)(Checkout);
