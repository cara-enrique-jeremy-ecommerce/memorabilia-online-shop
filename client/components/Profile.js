import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Profile extends React.Component {
  render() {
    const {firstName, lastName, email, id} = this.props.user

    return (
      <div className="container">
        <h3>
          <strong>Welcome, {firstName}!</strong>
        </h3>
        <hr />
        <h1>Account Details</h1>
        <p>Full Name: {`${firstName} ${lastName}`}</p>
        <p>Email: {email}</p>
        <h2>Your Addresses</h2>
        <p>Fetch addresses here...</p>
        <h2>Your Completed Orders</h2>
        <p>Fetch history of orders here...</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Profile)
