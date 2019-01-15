import React from 'react'
import {Link} from 'react-router-dom'

const AddToCartPopup = props => {
  return (
    <div className="popup-window">
      <a className="remove-btn" onClick={() => props.popupHandler()}>
        <i className="fa fa-times" />
      </a>
      <p>{props.name} was added to Cart!</p>
      <div className="popup-buttons">
        <Link to="/products">
          <p className="popup-btn add-to-cart-btn">Continue Shopping</p>
        </Link>
        <Link to="/cart">
          <p className="popup-btn add-to-cart-btn">Go to Cart</p>
        </Link>
      </div>
    </div>
  )
}

module.exports = AddToCartPopup
