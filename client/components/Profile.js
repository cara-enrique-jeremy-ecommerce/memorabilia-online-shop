import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Profile extends React.Component {
  render() {
    const {firstName, lastName, email} = this.props.user

    return (
      <div className="container">
        <div className="profile">
          <div className="account-details">
            <h1>Account Details</h1>
            <p className="account-label">Name</p>
            <p>{`${firstName} ${lastName}`}</p>
            <p className="account-label">Email</p>
            <p>{email}</p>
          </div>
          <div className="orders-addresses">
            <Link to="/profile/orders">
              <div className="orders animated">
                <h2>Your Orders</h2>
                <i className="fa fa-archive" aria-hidden="true" />
              </div>
            </Link>
            <Link to="/profile/addresses">
              <div className="addresses animated">
                <h2>Your Addresses</h2>
                <i className="fa fa-map-marker" aria-hidden="true" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Profile)
