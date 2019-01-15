import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {me} from '../store/user'
// import {fetchProductsInCart, deleteProductInCart} from '../store/products'
import {priceWithCommas} from './SingleProductSnapshot'
import OrderItemSnapshot from './OrderItemSnapshot'
import {Link} from 'react-router-dom'

class Cart extends Component {
  async handleRemove(productId, userId) {
    await this.props.deleteProductThunk(productId, userId)
  }

  render() {
    const {cart} = this.props

    let total = 0

    return (
      <div className="container">
        {cart.length ? (
          <div className="cart">
            <h1>SHOPPING CART</h1>
            <hr />
            <div className="orderitems">
              <ul>
                {cart.map(orderItem => {
                  return (
                    <OrderItemSnapshot
                      handleRemove={this.handleRemove}
                      key={orderItem.id}
                      orderItem={orderItem.product}
                      quantity={orderItem.quantity}
                      userId={this.props.user.id}
                    />
                  )
                })}
              </ul>
              <p>
                Total price:{' '}
                {cart.map(orderItem => {
                  total += Number(orderItem.price)
                  return total
                })}
              </p>
              <Link to="/checkout">
                <p className="add-to-cart-btn">Checkout!</p>
              </Link>
            </div>
          </div>
        ) : (
          <h2>
            Your car is empty cart<br />
            <br />
            <Link to="/products">Start shopping!</Link>
          </h2>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.products,
  cart: state.cart
})

export default connect(mapStateToProps)(Cart)
