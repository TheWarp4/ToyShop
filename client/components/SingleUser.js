import React, { useState, useEffect } from 'react'
import axios from 'axios'


function SingleUser(props) {
  // LOCAL STATE
  console.log(props, "this is props")
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    cardNum: '',
    cardExp: '',
    cardCvn: ''
  })

  const fetchUser = async (id) => {
    try {
      const {data} = await axios.get(`/api/users/${id}`)
      console.log(data, "this is data")
      setUser(data)
    }
    catch (error) {
      console.log(error)
    }
  }


  // FETCH SINGLE USER AXIOS REQ
  const handleSubmit = async function (event) {
    try {
      // event.preventDefault();
      alert("EVENT")
      await axios.put(`/api/users/${props.match.params.id}`, user);
      setUser({
        username: '',
        password: '',
        email: '',
        cardNum: '',
        cardExp: '',
        cardCvn: ''
      });
    } catch (err) {
      console.error(err);
    }
    alert("EVENT")
  };

  const handleChange = (event) => {
    console.log(event.target.name)
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log(props, "this is props")
    fetchUser(props.match.params.id)
  }, [])

  return (
    <div className = 'single-user'>
      <div>Current Username: {user.username}</div>
      <form>
        <div>
          <label htmlFor="username">
            <small>Change Username: </small>
          </label>
          <input name="username" onChange={handleChange} value={user.username} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>submit</button>
        </div>
      </form>
      <div>Current Password: {user.password}</div>
      <form>
        <div>
          <label htmlFor="password">
            <small>Change Password: </small>
          </label>
          <input name="password" onChange={handleChange} value={user.password}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
        <div>Current Email: {user.email}</div>
      <form>
        <div>
          <label htmlFor="email">
            <small>Change Email: </small>
          </label>
          <input name="email" onChange={handleChange} value={user.email}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>submit</button>
        </div>
      </form>
      <form>
        <div className="form-group">
          <label htmlFor="cardNum">Change Card Details: </label>
          <input name="cardNum" onChange={handleChange} placeholder="Card Number" value={user.cardNum || ''}/>
        </div>
        <div className="form-group">
          <label htmlFor="cardExp">Expiration Date:</label>
          <input name="cardExp" onChange={handleChange} placeholder="XX-XX-XXX" value={user.cardExp || ''}/>
        </div>
        <div className="form-group">
          <label htmlFor="cardCvn">CVN:</label>
          <input name="cardCvn" onChange={handleChange} placeholder="XXX" value={user.cardCvn || ''}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1"></label>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default SingleUser
