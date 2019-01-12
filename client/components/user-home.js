import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CategoryList from './CategoryList'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, adminPrivilege} = props

  return (
    <div className="container">
      <h3 className="welcomeuser">Welcome, {email}</h3>
      {adminPrivilege && (
        <div className="btn-right">
          <Link to="/add-product">
            <div className="add-to-cart-btn">Add Product</div>
          </Link>
        </div>
      )}
      <h1>Check out our Collections!</h1>
      <CategoryList />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    adminPrivilege: state.user.adminPrivilege
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
