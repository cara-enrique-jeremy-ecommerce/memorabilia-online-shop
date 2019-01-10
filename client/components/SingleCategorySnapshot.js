import React from 'react'
import {Link} from 'react-router-dom'

const SingleCategorySnapshot = props => {
  const {title, imageURL} = props.category
  return (
    <div className="category-item">
      <p>{title}</p>
      <Link to="/">
        <img className="category-snapshot" src={imageURL} />
      </Link>
    </div>
  )
}

export default SingleCategorySnapshot
