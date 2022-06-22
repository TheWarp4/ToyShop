import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const AllUsers = (props) => {
  const [users, setUsers] = useState([{}]);

  const getUsers = () => {
    try {
      (async () => {
        const { data } = await axios.get("/api/users");
        setUsers(data);
      })();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(getUsers, []);

  return (
    props.userType === "customer" || (
      <div className="allUsers">
        {users.map((user, i) => {
          return (
            <div className="user-info" key={i}>
              <div>
                <h3>
                  <ul>Username:{user.username}</ul>
                </h3>
                <img src={user.imageUrl} />
                <li>E-mail Address:{user.email} </li>
                <li>Customer Since:{user.createdAt}</li>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

const mapState = (state) => {
  return {
    userType: state.auth.type,
    username: state.auth.username,
    userId: state.auth.id,
    email: state.auth.email,
    customerSince: state.auth.createdAt,
  };
};

export default connect(mapState)(AllUsers);
