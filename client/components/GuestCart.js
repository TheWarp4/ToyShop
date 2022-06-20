import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";


function GuestCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [total, setTotal] = useState(0.00);

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
                <button className="sc-incrementer" onClick={() => console.log('hi')}>-</button>
                {product.itemQuantity}
                <button className="sc-incrementer" onClick={() => console.log('hi')}>+</button>
                </div>
              </div>
              </div>
              <div>${product.price}</div>
              <button className="delete-sc-item"
                onClick={() => console.log('hi')}
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

export default GuestCart
