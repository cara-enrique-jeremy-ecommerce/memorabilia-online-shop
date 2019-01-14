import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchProductsInCart, deleteProductInCart} from '../store/products'
import OrderItemSnapshot from './OrderItemSnapshot'
import {Link} from 'react-router-dom'

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

  async handleRemove(productId, userId) {
    await this.props.deleteProductThunk(productId, userId)
  }

  getCart = async userId => {
    console.log('getting cart?')
    await this.props.getCartThunk(userId)
  }
  calcTotal = objects => {
    let total = 0
    objects.forEach(object => {
      total += object.price
    })
    return `Total:   $${(total / 100).toFixed(2)}`
  }
  // {this.props.products
  //   ? this.calcTotal(this.props.products)
  //   : 'Total:   $ 0.00'}

  render() {
    console.log('checking ', this.props)
    if (this.props.user.id && !this.state.gotCart) {
      console.log('printing? ')
      this.getCart(this.props.user.id)
      this.setState({gotCart: true})
    }
    console.log('cart length? ', this.props.cart, this.state.gotCart)
    return (
      <div>
        {this.props.cart.length ? (
          <div className="cart container">
            <h1>CART</h1>
            <div className="orderitems">
              <ul>
                {this.props.cart.map(orderItem => {
                  return (
                    <OrderItemSnapshot
                      handleRemove={this.handleRemove}
                      key={orderItem.id}
                      orderItem={orderItem}
                      userId={this.props.user.id}
                    />
                  )
                })}
              </ul>
            </div>
            <p>Total price to be coded...</p>
            <Link to="/checkout">
              <p>Checkout!</p>
            </Link>
          </div>
        ) : (
          <h2>empty cart, start shopping!</h2>
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

const mapDispatchToProps = dispatch => ({
  getCartThunk: userId => {
    dispatch(fetchProductsInCart(userId))
  },
  deleteProductThunk: (productId, userId) => {
    dispatch(deleteProductInCart(productId, userId))
  },
  getUser: () => {
    dispatch(me)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
