import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {priceWithCommas} from './SingleProductSnapshot'
import {Link} from 'react-router-dom'
import {EditProductForm} from './'
import {addToCart} from '../store/cart'

class SingleProductDetail extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {
    const {product, user} = this.props
    const {image, name, price, description, quantity} = product

    return (
      <div className="container">
        {product && (
          <div className="single-product-detail">
            <div className="single-product-image">
              <img src={image} />
            </div>
            <div className="single-product-info">
              <h1>{name}</h1>
              <p className="rating">
                <i className="fa fa-star-o" aria-hidden="true" />
                <i className="fa fa-star-o" aria-hidden="true" />
                <i className="fa fa-star-o" aria-hidden="true" />
                <i className="fa fa-star-o" aria-hidden="true" />
                <i className="fa fa-star-o" aria-hidden="true" />
              </p>
              <p className="inventory">Only {quantity} left!</p>
              <div className="main-info">
                {price && (
                  <p className="price">
                    Price: <span>${priceWithCommas(price)}</span>
                  </p>
                )}
                {/* <Link to="/"> */}
                <p
                  className="add-to-cart-btn"
                  onClick={() => this.props.addToCart(user, product)}
                >
                  Add to Cart!
                </p>
                {/* </Link> */}
              </div>

              <Link to="/" className="customer-reviews">
                27 customer reviews
              </Link>

              <h3>Description</h3>
              <p>{description}</p>
            </div>
          </div>
        )}
        {product.id === Number(this.props.match.params.productId) &&
          user.adminPrivilege && (
            <div>
              <EditProductForm product={product} />
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.singleProduct,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
  addToCart: (user, product) => dispatch(addToCart(user, product))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductDetail)
