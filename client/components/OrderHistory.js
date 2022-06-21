import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderHistory = ({ userId }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/users/${userId}/orderHistory`);
      setOrderHistory(data);
    })();
  }, []);

  return (
    <div className="order-history">
      {orderHistory.map((order) => {
        return (
          <div key={order.id}>
            <div>Purchased date: {order.updatedAt}</div>
            <div className="single-order-history">
              {order.products.map((product) => {
                return <Order product={product} key={product.id} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Order = ({ product }) => {
  return (
    <div className="order-history-product">
      <img src={product.image} />
      <div>{product.productName}</div>
      <div>${product.price}</div>
      <div>Quantity: {product.ShoppingCart.itemQuantity}</div>
    </div>
  );
};

export default OrderHistory;
