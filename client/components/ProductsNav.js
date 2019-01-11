import React from 'react'
import {Link} from 'react-router-dom'
import store from '../store'
import {gotCurrentCategory} from '../store/currentCategory'

const ProductsNav = () => (
  <div className="productsnav">
    <select>
      <option>Choose a Collection...</option>
      <option>Harry Potter</option>
      <option>Superman</option>
      <option>Batman</option>
      <option>The Lord of the Rings</option>
      <option>Fetch categories from state...</option>
    </select>

    <div className="popular">
      <p>Most Popular:</p>
      <Link to="/">HARRY POTTER</Link>
      <Link to="/">STAR WARS</Link>
      <Link to="/">THE LORD OF THE RINGS</Link>
      <Link
        to="/products"
        onClick={() => store.dispatch(gotCurrentCategory({}))}
      >
        All Products
      </Link>
    </div>

    <div className="searchbar">
      <input placeholder="Search..." />
    </div>
  </div>
)

export default ProductsNav
