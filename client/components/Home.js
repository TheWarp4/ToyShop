import React from "react";
import { connect } from "react-redux";
import AddProduct from "./AddProduct";
import AllUsers from "./AllUsers";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  const { id } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>
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
    id: state.auth.id,
  };
};

export default connect(mapState)(Home);
