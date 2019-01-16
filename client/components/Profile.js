import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import CompletedOrders from './CompletedOrders'
import {fetchCompletedOrders} from '../store/orders'

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchCompletedOrders(this.props.user.id)
  }

  render() {
    const {firstName, lastName, email} = this.props.user
    console.log(this.props)

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
        <h2>Order History</h2>
        <CompletedOrders orders={this.props.orders} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  fetchCompletedOrders: id => dispatch(fetchCompletedOrders(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

Profile.propTypes = {
  fetchCompletedOrders: PropTypes.func.isRequired
}
