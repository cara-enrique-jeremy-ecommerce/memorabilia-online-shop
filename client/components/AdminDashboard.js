import React from 'react'
import {connect} from 'react-redux'

class AdminDashboard extends React.Component {
  componentDidMount() {}
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}
