import React from 'react'
import {connect} from 'react-redux'
import SingleProductSnapshot from './SingleProductSnapshot'
import {fetchCurrentCategory} from '../store/currentCategory'
import {fetchAllProducts} from '../store/products'
import {Link} from 'react-router-dom'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const {products, user, currentCategory} = this.props

    let renderProducts = products ? products.slice() : products

    if (currentCategory.id || this.props.match.params.categoryId) {
      renderProducts = products.filter(product => {
        return (
          product.categoryId ===
          (currentCategory.id || Number(this.props.match.params.categoryId))
        )
      })
    }

    return (
      <div className="container products">
        {user.adminPrivilege && (
          <Link to="/add-product">
            <div className="add-to-cart-btn">Add Product</div>
          </Link>
        )}
        {products &&
          renderProducts.map(product => {
            return (
              <div key={product.id}>
                <SingleProductSnapshot product={product} />
                {user.adminPrivilege && (
                  <Link to={`/products/${product.id}`}>
                    <div className="add-to-cart-btn">Edit Product</div>
                  </Link>
                )}
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    currentCategory: state.currentCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts),
    getCurrentCategory: id => dispatch(fetchCurrentCategory(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
