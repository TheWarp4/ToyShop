import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import AllUsers from "./components/AllUsers";
import Cart from "./components/Cart";
import SingleUser from "./components/SingleUser"
import Checkout from "./components/Checkout";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            {/* <Redirect to="/home" /> */}
            <Route path="/" exact component={AllProducts} />
            <Route path="/products" exact component={AllProducts} />
            <Route path="/users" exact component={AllUsers} />
            {/* <Route path='/' exact component={ Login } /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:id" exact component={SingleProduct} />
            <Route path="/user/:id" exact component={SingleUser} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/checkout" exact component={Checkout} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={AllProducts} />
            <Route path="/products" exact component={AllProducts} />
            {/* <Route path='/' exact component={ Login } /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:id" exact component={SingleProduct} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/checkout" exact component={Checkout} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
