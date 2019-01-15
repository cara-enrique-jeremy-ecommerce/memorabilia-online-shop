import React from 'react'
import {Link} from 'react-router-dom'

const OrderItemSnapshot = props => {
  const {handleRemove, userId} = props
  const {id, name, price, image, description, quantityInOrder} = props.orderItem

  // <Link to={`products/${id}`}></Link>
  // {/* <h2>{product.orderItem.quantity}</h2> */}

  return (
    <li key={id}>
      <div className="orderdetails-left">
        <img className="order-item-img" src={image} />
      </div>
      <div className="orderdetails-right">
        <h2>{name}</h2>
        <p>{description}</p>
        <div className="right-down">
          <div className="right-down-left">
            <p>Price: {price}</p>
            <p>Quantity: {quantityInOrder}</p>
          </div>
          <button
            className="remove-btn"
            type="button"
            onClick={() => handleRemove(id, userId)}
          >
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  )
}

module.exports = OrderItemSnapshot
