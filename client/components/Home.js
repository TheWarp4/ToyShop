import React from "react";
import { connect } from "react-redux";
import AddProduct from "./AddProduct";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  const { id } = props;
  console.log(props.id);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <AddProduct />
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
