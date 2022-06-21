import React from "react";
import { connect } from "react-redux";
import AddProduct from "./AddProduct";
import AllUsers from "./AllUsers";
import axios from "axios";
import { useState, useEffect } from "react";

/**
 * COMPONENT
 */
export const Home = (props) => {

  const fetchCartFromLocalStorage = JSON.parse(window.localStorage.getItem('cart') || '[]')

  const [cart, setCart] = useState(fetchCartFromLocalStorage);



  const mergeLocalCart = async (userId) => {
    try {
      const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`)
      const {data} = await axios.get(`/api/shoppingcarts/${getOrderSessionId.data.id}`)
      cart.map(async (prodData) => {
        await axios.post(`/api/shoppingcarts`, {
          orderSessionId: getOrderSessionId.data.id,
          productId: prodData.id,
          itemQuantity: prodData.itemQuantity,
        })
      })
      localStorage.setItem('cart', JSON.stringify([]))
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(props.userId) {
      mergeLocalCart(props.userId);
    }
  }, [props.userId, cart])

  return (
    <div>
      <h3>Welcome, {props.username}</h3>
      <AddProduct />
      <div>
        <div>
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */


const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
  };
};

export default connect(mapState)(Home);
