import React, {Component} from 'react'
import {connect} from 'react-redux'
import OrderItemSnapshot from './OrderItemSnapshot'
import {Link} from 'react-router-dom'

class Cart extends Component {
  render() {
    const cart = []
    for (let key in this.props.cart) {
      if (this.props.cart.hasOwnProperty(key)) {
        cart.push(this.props.cart[key])
      }
    }

    return (
      <div className="container">
        {cart.length ? (
          <div className="cart">
            <h1>SHOPPING CART</h1>
            <div className="orderitems">
              <ul>
                {cart.map(orderItem => {
                  return (
                    <OrderItemSnapshot
                      handleRemove={this.handleRemove}
                      key={orderItem.id}
                      orderItem={orderItem}
                      quantity={orderItem.quantityInOrder}
                      userId={this.props.user.id}
                    />
                  )
                })}
              </ul>
              <p>
                Total price:{' $'}
                {cart.reduce((total, orderItem) => {
                  const totalItem =
                    Number(orderItem.price) * orderItem.quantityInOrder
                  return total + totalItem
                }, 0)}
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
