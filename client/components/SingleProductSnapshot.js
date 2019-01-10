import React from 'react'

const SingleProductSnapshot = props => {
  return (
    <div className="product-item">
      <p>
        <img className="product-snapshot" src={props.product.image} />
      </p>
      <p>{props.product.name}</p>
      <p>${props.product.price}</p>
    </div>
  )
}

export default SingleProductSnapshot
