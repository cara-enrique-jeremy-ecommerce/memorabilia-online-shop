import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'
import {fetchCart} from '../store/cart'

class Navbar extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData()

    if (this.props.user.id) {
      this.props.fetchCart(this.props.user.id)
    } else {
      this.props.fetchCart()
    }
  }

  render() {
    const {handleClick, isLoggedIn} = this.props
    const cartLength = this.props.cart ? Object.keys(this.props.cart).length : 0
    return (
      <div className="navbar">
        <Link to="/">
          <h1 className="logo animated">
            <i className="fa fa-film" /> Memorabilia
          </h1>
        </Link>

        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/profile">
                <i className="fa fa-user-circle-o" />
              </Link>
              <Link className="shopping-cart" to="/cart">
                <i className="fa fa-shopping-cart" />
                {this.props.cart && <span>{` ${cartLength}`}</span>}
              </Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link className="shopping-cart" to="/cart">
                <i className="fa fa-shopping-cart" />
                {this.props.cart && <span>{` ${cartLength}`}</span>}
              </Link>
            </div>
          )}
        </nav>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  handleClick: async () => {
    await dispatch(logout())
    dispatch(fetchCart())
  },
  fetchCart: userId => dispatch(fetchCart(userId))
})

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  fetchCart: PropTypes.func.isRequired
}
