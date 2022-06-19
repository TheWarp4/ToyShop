import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { BiCart, BiHomeAlt, BiPurchaseTagAlt } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

const Navbar = ({ handleClick, isLoggedIn, id }) => (
  <div>
    <nav>
      <div className="navbar-container">
        <h1>Toy Store</h1>
        <Link to="/home">
          <BiHomeAlt className="home-button" size={30} />
        </Link>
        <Link to="/products"> Products</Link>
        <BiCart
          className="cart-button"
          size={30}
          onClick={() => {
            location.href = `/cart`;
          }}
        />
        {isLoggedIn ? (
          <>
            <Link to={`/user/${id}`}>
              <FaUserAlt size={30} />
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login" className="login-button">
              Login
            </Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    id: state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
