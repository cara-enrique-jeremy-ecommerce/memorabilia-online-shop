import React from 'react'
import {Link} from 'react-router-dom'

// Helper functions for price's commas and caption sliced from description

export const priceWithCommas = price => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const createCaption = description => {
  return `${description.slice(0, 55)}...`
}

const SingleProductSnapshot = props => {
  const {id, name, image, category, price, description} = props.product

  return (
    <div className="product-item">
      <Link to={`/products/${id}`}>
        <img className="product-snapshot" src={image} />
      </Link>
      <div className="product-info">
        <Link to={`/products/${id}`}>
          <h3>{name}</h3>
        </Link>
        <span>- {category.title} -</span>
        <p className="caption">{createCaption(description)}</p>
        <p>
          <i className="fa fa-star-o" aria-hidden="true" />
          <i className="fa fa-star-o" aria-hidden="true" />
          <i className="fa fa-star-o" aria-hidden="true" />
          <i className="fa fa-star-o" aria-hidden="true" />
          <i className="fa fa-star-o" aria-hidden="true" />
        </p>
        <p className="price">${priceWithCommas(price)}</p>
      </div>
    </div>
  )
}

export default SingleProductSnapshot
