import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {priceWithCommas} from './SingleProductSnapshot'
import {Link} from 'react-router-dom'
import {EditProductForm} from './'
import {addToCart} from '../store/cart'
import AddToCartPopup from './AddToCartPopup'

class SingleProductDetail extends Component {
  constructor() {
    super()
    this.state = {
      popup: false,
      quantityToAdd: 1
    }
    this.popupHandler = this.popupHandler.bind(this)
    this.changeSelected = this.changeSelected.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  popupHandler() {
    this.setState({
      popup: !this.state.popup
    })
  }

  changeSelected(event) {
    this.setState({quantityToAdd: event.target.value})
  }

  render() {
    const {product, user} = this.props
    const {image, name, price, description, quantity} = product
    console.log('quantity to add on state: ', this.state.quantityToAdd)
    const quantityToAdd = this.state.quantityToAdd

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
                <p />
                <p>
                  <select name="quantityToAdd" onChange={this.changeSelected}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                </p>
                <span
                  className="add-to-cart-btn"
                  onClick={() => {
                    this.props.addToCart(
                      user,
                      product,
                      this.props.cart,
                      quantityToAdd
                    )
                    this.popupHandler()
                  }}
                >
                  Add to Cart!
                </span>
              </div>

              <Link to="/" className="customer-reviews">
                27 customer reviews
              </Link>

              <h3>Description</h3>
              <p>{description}</p>
            </div>
            {this.state.popup && (
              <AddToCartPopup name={name} popupHandler={this.popupHandler} />
            )}
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
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
  addToCart: (user, product, currentCart, quantityToAdd) =>
    dispatch(addToCart(user, product, currentCart, quantityToAdd))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductDetail)
