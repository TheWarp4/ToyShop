import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const DeleteProduct = (props) => {
  const handleClick = async function (event) {
    try {
      event.preventDefault();
      const token = window.localStorage.getItem("token");
      await axios.delete(`/api/products/${props.product.id}`, {
        headers: {
          authorization: token,
        },
      });
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteProduct;
