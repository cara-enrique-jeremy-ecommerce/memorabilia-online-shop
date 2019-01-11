import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store from '../store'
import {
  gotCurrentCategory,
  fetchCurrentCategory
} from '../store/currentCategory'
import {fetchAllCategories} from '../store/categories'
import Dropdown from './Dropdown'

class ProductsNav extends React.Component {
  componentDidMount() {
    this.props.fetchAllCategories()
  }

  render() {
    const {categories, setCurrentCategory} = this.props

    return (
      <div className="productsnav">
        <Dropdown
          categories={categories}
          setCurrentCategory={setCurrentCategory}
        />

        <div className="popular">
          <p>Most Popular:</p>
          <Link to="/categories/2" onClick={() => setCurrentCategory(2)}>
            HARRY POTTER
          </Link>
          <Link to="/categories/3" onClick={() => setCurrentCategory(3)}>
            STAR WARS
          </Link>
          <Link to="/categories/5" onClick={() => setCurrentCategory(5)}>
            THE LORD OF THE RINGS
          </Link>
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
  }
}
const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: () => dispatch(fetchAllCategories),
  setCurrentCategory: id => dispatch(fetchCurrentCategory(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsNav)
