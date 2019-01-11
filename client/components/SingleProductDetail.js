import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {priceWithCommas} from './SingleProductSnapshot'
import {Link} from 'react-router-dom'

class SingleProductDetail extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {
    const {product} = this.props
    const {image, name, price, description, quantity} = product
    console.log(quantity)
    return (
      <div className="single-product">
        {product && (
          <div className="single-product-detail">
            <img className="single-product-image" src={image} />
            <div className="single-product-info">
              <h1>{name}</h1>
              <p className="rating">
                <i className="fa fa-star-o" aria-hidden="true" />
                <i className="fa fa-star-o" aria-hidden="true" />
                <i className="fa fa-star-o" aria-hidden="true" />
                <i className="fa fa-star-o" aria-hidden="true" />
                <i className="fa fa-star-o" aria-hidden="true" />
              </p>
              <p className="inventory">Only ${quantity} left!</p>
              <div className="main-info">
                {price && (
                  <p className="price">
                    Price: <span>${priceWithCommas(price)}</span>
                  </p>
                )}
                <Link to="/">
                  <p className="add-to-cart-btn">Add to Cart!</p>
                </Link>
              </div>

              <Link to="/" className="customer-reviews">
                27 customer reviews
              </Link>

              <h3>Description</h3>
              <p>{description}</p>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.singleProduct
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductDetail)
