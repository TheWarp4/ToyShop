import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";


function GuestCart(props) {
  const fetchCartFromLocalStorage = JSON.parse(window.localStorage.getItem('cart') || '[]')
  const [cart, setCart] = useState(fetchCartFromLocalStorage);
  const [total, setTotal] = useState(0.00);

  const sumTotal = (arr) => {
    setTotal(arr.reduce((accum, element) => {
      return accum += element.price*element.itemQuantity
    }, 0))
  }

  const handleDecrement = (productId) => {
    cart.map((element, i) => {
      if (element.id == productId) {
        cart[i].itemQuantity--;
        localStorage.setItem('cart', JSON.stringify(cart))
        setCart([...cart])
      }
    })
  }

  const handleIncrement = (productId) => {
    cart.map((element, i) => {
      if (element.id == productId) {
        cart[i].itemQuantity++
        localStorage.setItem('cart', JSON.stringify(cart))
        setCart([...cart])

      }
    })
  }


  const handleDelete = (productid) => {
    localStorage.setItem('cart', JSON.stringify(cart.filter((element) =>
     (element.id !== productid)
    )))
    setCart([...cart.filter((element) =>
      (element.id !== productid)
     )])
  }


  useEffect(() => {
    sumTotal(cart)
  }, [cart])

  console.log(cart)

  return (
    <div>
      <h1 className='cart-title'>Shopping Cart</h1>
      <div className="shopping-cart">
        {cart.map((product) => (
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
                <button className="sc-incrementer" onClick={() =>
                  (handleDecrement(product.id))
                  }>-</button>
                {product.itemQuantity}
                <button className="sc-incrementer" onClick={() => (handleIncrement(product.id))}>+</button>
                </div>
              </div>
              </div>
              <div>${product.price}</div>
              <button className="delete-sc-item"
                onClick={() => handleDelete(product.id)}
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
