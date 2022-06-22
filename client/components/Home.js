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
