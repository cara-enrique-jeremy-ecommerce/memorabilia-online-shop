import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchProductsInCart, deleteProductInCart} from '../store/products'

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
        <div>
          <h1>CART</h1>
        </div>
        {this.props.cart.length ? (
          <div>
            <ul>
              {this.props.cart.map(product => {
                return (
                  <li key={product.id}>
                    <h2>{product.name}</h2>
                    {/* <Link to={`products/${product.id}`}>
                        <img className="cart-item-img" src={product.image[0]} />
                          <h2>{product.name}</h2>
                      </Link> */}
                    <div>
                      {/* <h2>{product.orderItem.quantity}</h2> */}
                      <div />
                      <h2>{product.price}</h2>
                      <button
                        onClick={() =>
                          this.handleRemove(product.id, this.props.user.id)
                        }
                      >
                        <h1>X</h1>
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
            {this.props.products.length ? (
              <div>
                <h2>
                  {this.props.products
                    ? this.calcTotal(this.props.products)
                    : 'Total:   $ 0.00'}
                </h2>
                <hr />
                <button>
                  <h2>Checkout</h2>
                </button>
              </div>
            ) : (
              <h2>empty cart, start shopping!</h2>
            )}
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
