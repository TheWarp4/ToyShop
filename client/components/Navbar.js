import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { BiCart } from "react-icons/bi";
import {FaUserAlt} from "react-icons/fa";

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className='navbar-container'>
           <h1>Toy Store</h1>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <FaUserAlt className='account-button' size={30}/>
          <BiCart
            className='cart-button'
            size={30}
            onClick={() => {
              location.href = `/cart`
          }}
            />
        </div>
      ) : (
        <div className='navbar-container'>
          {/* The navbar will show these links before you log in */}
          <h1>Toy Store</h1>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <FaUserAlt className='account-button' size={30}/>
          <BiCart
            className='cart-button'
            size={30}
            onClick={() => {
              location.href = `/cart`
          }}
            />
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
