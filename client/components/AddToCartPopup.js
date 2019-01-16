import React from 'react'
import {Link} from 'react-router-dom'

const AddToCartPopup = props => {
  return (
    <div>
      <div className="popup-wrapperbg" />
      <div className="popup-window">
        <a className="remove-btn" onClick={() => props.popupHandler()}>
          <i className="fa fa-times" />
        </a>
        <p>
          <i className="fa fa-check-circle-o" aria-hidden="true" />
          {props.name} was added to your cart!
        </p>
        <div className="popup-buttons">
          <Link to="/products">
            <p className="popup-btn add-to-cart-btn">Continue Shopping</p>
          </Link>
          <Link to="/cart">
            <p className="popup-btn add-to-cart-btn">Go to Cart</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

module.exports = AddToCartPopup
