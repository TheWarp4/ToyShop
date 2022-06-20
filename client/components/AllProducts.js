import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const AllProducts = (props) => {
  const [products, setProducts] = useState([{}]);

  const fetchCartFromLocalStorage = JSON.parse(window.localStorage.getItem('cart') || '[]')
  const [cart, setCart] = useState(fetchCartFromLocalStorage);

  const getProducts = () => {
    try {
      (async () => {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      })();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (userId, productId) => {
    try {
      const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`)
      await axios.post('/api/shoppingcarts', {
        orderSessionId: getOrderSessionId.data.id,
        productId: productId,
        itemQuantity: 1,
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [props.userId, cart])

  return (
    <div className="allProducts">
      {products.map((product, i) => {
        return (
          <div className="product-info" key={i}>
            <img
              className="products-photo"
              src={product.image}
              onClick={() => {
                location.href = `/products/${product.id}`;
              }}
            />
            <div>{product.productName}</div>
            <div>${product.price}</div>
            <button
              onClick={() => {
                props.isLoggedIn ? (
                handleAddToCart(props.userId, product.id)
                ) : (
                  guestCart(cart, product, setCart)
                )
                }
              }>
              <FaShoppingCart />
              Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

const isProductInCart = (arr, productId) => {

  for (let i = 0; i < arr.length; i++ ){
    if ((arr[i].id) === (productId)) {
      return [true, i];
    }
  }
  return [false, -1];
  }

const guestCart = (cart, product, setCart) => {
  const [isInCart, index] = isProductInCart(cart, product.id);
  console.log(isInCart,index)
  if (isInCart) {
    cart[index].itemQuantity += 1;
  }
  else {
  product.itemQuantity = 1;
  setCart(prevCart => [...prevCart, product ])}
  }

const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(AllProducts);

// export default AllProducts;
