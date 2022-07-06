import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const Cart = (props) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [total, setTotal] = useState(0.0);
  const fetchCartFromLocalStorage = JSON.parse(
    window.localStorage.getItem("cart") || "[]"
  );

  const [cart, setCart] = useState(fetchCartFromLocalStorage);

  const mergeLocalCart = async (userId) => {
    try {
      const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`);
      const { data } = await axios.get(
        `/api/shoppingcarts/${getOrderSessionId.data.id}`
      );
      cart.map(async (prodData) => {
        await axios.post(`/api/shoppingcarts`, {
          orderSessionId: getOrderSessionId.data.id,
          productId: prodData.id,
          itemQuantity: prodData.itemQuantity,
        });
      });
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchShoppingCart = async (userId) => {
    try {
      const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`);
      const { data } = await axios.get(
        `/api/shoppingcarts/${getOrderSessionId.data.id}`
      );
      data.map(async (prodData) => {
        const productInfo = await axios.get(
          `/api/products/${prodData.productId}`
        );
        productInfo.data.singleProduct.itemQuantity = prodData.itemQuantity;
        setShoppingCart((prevCart) => [
          ...prevCart,
          productInfo.data.singleProduct,
        ]);
        setTotal(
          (prevTotal) =>
            prevTotal +
            parseFloat(productInfo.data.singleProduct.price) *
              prodData.itemQuantity
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.userId) {
      mergeLocalCart(props.userId);
      fetchShoppingCart(props.userId);
    }
  }, [props.userId, cart]);

  return (
    <div id="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="shopping-cart">
        {shoppingCart.map((product) => (
          <div key={product.id}>
            <SingleProductInCart
              product={product}
              userId={props.userId}
              setTotal={setTotal}
              total={total}
            />
          </div>
        ))}
        <div className="sc-subtotal-checkout">
          <div className="sc-subtotal single-product-info">
            SubTotal: ${total.toFixed(2)}
          </div>
          <button
            className="sc-checkout-btn"
            onClick={() => {
              if (shoppingCart.length >= 1) {
                location.href = `/checkout`;
              }
            }}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

const SingleProductInCart = ({ product, userId, setTotal, total }) => {
  const [productItemQuantity, setProductItemQuantity] = useState(
    product.itemQuantity
  );
  const [isProductExist, setIsProductExist] = useState(true);
  const deleteFromShoppingCart = async (userId, productId) => {
    const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`);
    await axios.delete(
      `/api/shoppingcarts/${getOrderSessionId.data.id}/${productId}`
    );
    setTotal(total - product.price * productItemQuantity);
    setIsProductExist(false);
  };

  const handleDecrement = async (userId, productId) => {
    setProductItemQuantity(productItemQuantity - 1);

    const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`);
    const { data } = await axios.get(
      `/api/shoppingcarts/${getOrderSessionId.data.id}`
    );
    const [foundProduct] = data.filter(
      (product) => product.productId == productId
    );
    if (productItemQuantity == 1) {
      await axios.delete(
        `/api/shoppingcarts/${getOrderSessionId.data.id}/${productId}`
      );
      setIsProductExist(false);
    } else {
      await axios.put(
        `/api/shoppingcarts/${getOrderSessionId.data.id}/${productId}/decrement`
      );
    }
    setTotal(total - product.price);
  };

  const handleIncrement = async (userId, productId) => {
    setProductItemQuantity(productItemQuantity + 1);
    const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`);
    await axios.put(
      `/api/shoppingcarts/${getOrderSessionId.data.id}/${productId}/increment`
    );
    setTotal(total + product.price);
  };

  return (
    !isProductExist || (
      <div>
        <div className="product-info-container">
          <img
            className="sc-photo"
            src={`${product.image}`}
            onClick={() => {
              location.href = `/products/${product.id}`;
            }}
          />
          <div className="product-details">
            <div>
              <div className="sc-product-name">{product.productName}</div>
              <div className="sc-quantity">
                <button
                  className="sc-incrementer"
                  onClick={() => {
                    handleDecrement(userId, product.id);
                  }}
                >
                  -
                </button>
                {productItemQuantity}
                <button
                  className="sc-incrementer"
                  onClick={() => {
                    handleIncrement(userId, product.id);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>${product.price}</div>
          <button
            className="delete-sc-item"
            onClick={() => deleteFromShoppingCart(userId, product.id)}
          >
            X
          </button>
        </div>
        <hr className="sc-horizontal-line" />
      </div>
    )
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(Cart);
