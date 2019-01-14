import React from 'react'
import {Link} from 'react-router-dom'

const OrderItemSnapshot = props => {
  const {handleRemove, userId} = props
  const {id, name, price, image, description} = props.orderItem

  // <Link to={`products/${id}`}></Link>
  // {/* <h2>{product.orderItem.quantity}</h2> */}

  return (
    <li key={id}>
      <div className="orderdetails-left">
        <img className="order-item-img" src={image} />
      </div>
      <div className="orderdetails-right">
        <h2>{name}</h2>
        <p>Description</p>
        <p>{description}</p>
        <p>Price: {price}</p>
        <button type="button" onClick={() => handleRemove(id, userId)}>
          <i className="fa fa-trash-o" aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}

module.exports = OrderItemSnapshot
