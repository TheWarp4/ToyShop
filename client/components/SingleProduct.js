import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'


function SingleProduct(props) {
  // LOCAL STATE
  const [product, setProduct] = useState({})

  // FETCH SINGLE PRODUCT AXIOS REQ
  const fetchProduct = async (id) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      console.log(data.singleProduct)
      setProduct(data.singleProduct)
    }
    catch (error) {
      console.log(error)
    }
  }


  // USE EFFECT (OR COMPDIDMOUNT)
  useEffect(() => {
    fetchProduct(props.match.params.id)
  }, [])

  return (
    <div>
      <img src = {product.image}/>
      <div>{product.productName}</div>
      <div>{product.description}</div>
      <div>{product.category}</div>
      <div>{product.price}</div>
    </div>
  )
}

export default SingleProduct
