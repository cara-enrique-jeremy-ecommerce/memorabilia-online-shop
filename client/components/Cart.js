import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchProductsInCart} from '../store/products'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      gotCart: false
    }
  }
  async componentDidMount() {
    await this.props.getUser()
  }

  getCart = async userId => {
    await this.props.getCartThunk(userId)
  }
  calcTotal = objects => {
    let total = 0
    objects.forEach(object => {
      total += object.price
    })
    return `Total:   $${(total / 100).toFixed(2)}`
  }
  render() {
    if (this.props.user.id && !this.state.gotCart) {
      this.getCart(this.props.user.id)
      this.gotCart = true
    }

    return (
      <div>
        <div className="flex center category-header">
          <h1>CART</h1>
        </div>
        <ul className="cart-list">
          {this.props.products.products ? (
            this.props.products.products.map(product => {
              return (
                <li className="cart-list-item" key={product.id}>
                  <div className="cart-item-inner">
                    <img className="cart-item-img" src={product.photos[0]} />
                    <h2>{product.name}</h2>
                  </div>
                  <div className="cart-item-inner">
                    <h2>3</h2>
                    <div className="vr bgb h100" />
                    <h2>{`$${(product.price / 100).toFixed(2)}`}</h2>
                    <button className="remove-button hover-light">
                      <h1>X</h1>
                    </button>
                  </div>
                </li>
              )
            })
          ) : (
            <li>nothing in cart</li>
          )}
        </ul>
        <div id="checkout-container">
          <h2 id="total">
            {this.props.products.products
              ? this.calcTotal(this.props.products.products)
              : 'Total:   $ 0.00'}
          </h2>
          <hr />
          <button id="checkout-button">
            <h2>Checkout</h2>
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getCartThunk: userId => {
    dispatch(fetchProductsInCart(userId))
  },
  getUser: () => {
    dispatch(me)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
