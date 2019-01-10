import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CategoryList from './CategoryList'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="container">
      <h3 className="welcomeuser">Welcome, {email}</h3>
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
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
