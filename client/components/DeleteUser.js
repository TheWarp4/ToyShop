import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const DeleteUser = (props) => {
  const handleClick = async function (event) {
    try {
      event.preventDefault();
      const token = window.localStorage.getItem("token");
      await axios.delete(`/api/users/${props.user.id}`, {
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

export default DeleteUser;
