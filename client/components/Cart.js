import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";

const Cart = (props) => {

  const [shoppingCart, setShoppingCart] = useState([]);

  // const fetchShoppingCart = async (userId) => {
  //   try {
  //     const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`)
  //     console.log(getOrderSessionId)
  //     const fetchShoppingCart = await axios.get(`/api/shoppingcarts/${getOrderSessionId.data.id}`)
  //     console.log(fetchShoppingCart)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  useEffect(
    // fetchShoppingCart(props.userId),
  []);

  return (
    <div>
      <h1 className='cart-title'>Shopping Cart</h1>
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
