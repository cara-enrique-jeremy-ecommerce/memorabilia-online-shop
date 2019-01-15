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
    }
  }

  render() {
    const {handleClick, isLoggedIn, user, cart} = this.props
    return (
      <div className="navbar">
        <Link to="/">
          <h1 className="logo animated">MOVIE'S Non-Props</h1>
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
                {cart && <span>{cart.length}</span>}
              </Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link className="shopping-cart" to="/cart">
                <i className="fa fa-shopping-cart" />
                <span>0</span>
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
  handleClick: () => dispatch(logout()),
  fetchCart: userId => dispatch(fetchCart(userId))
})

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
