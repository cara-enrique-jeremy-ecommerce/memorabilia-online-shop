import React from 'react'

const SingleProductSnapshot = props => {
  return (
    <div className="product-item">
      <img className="product-snapshot" src={props.product.image} />
      <p>Category: {props.product.category.title}</p>
      <p>Item Name: {props.product.name}</p>
      <p>${props.product.price}</p>
    </div>
  )
}

export default SingleProductSnapshot
