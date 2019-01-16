import React from 'react'

const OrderItemSnapshot = props => {
  const {handleRemove, userId, quantity} = props
  const {name, price, image, description} = props.orderItem

  return (
    <li>
      <div className="orderdetails-left">
        <img className="order-item-img" src={image} />
      </div>
      <div className="orderdetails-right">
        <h2>{name}</h2>
        <p>{description}</p>
        <div className="right-down">
          <div className="right-down-left">
            <p>
              Price: <span>{price}</span>
            </p>
            <p>
              Qty: <span className="quantity-in-cart">{quantity}</span>
            </p>
          </div>
          <button
            className="remove-btn"
            type="button"
            onClick={() => handleRemove(userId, props.orderItem.id)}
          >
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  )
}

module.exports = OrderItemSnapshot
