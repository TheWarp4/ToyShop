import React from 'react'

function OrderConfirmation() {
  return (
    <div>
      <img id = 'oc-logo' src = 'https://as2.ftcdn.net/v2/jpg/01/58/01/63/1000_F_158016300_pcGwEK4sMMIFCQI7X1jeNyIad2cVNnd3.jpg' />
    <h1 id='oc-thank-you-text'>Thank you!</h1>
      <h2 className='oc-confirmation-sent-text'>A confirmation has been sent to your email, ${localStorage.getItem("email")}</h2>
    </div>

  )
}

export default OrderConfirmation
