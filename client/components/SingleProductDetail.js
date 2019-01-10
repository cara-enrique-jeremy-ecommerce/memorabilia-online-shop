import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/GOT_PRODUCTS'

class SingleProductDetail extends Component {
  async componentDidMount() {
    try {
      const productId = Number(this.props.match.params.productId)
      await this.props.getSock(productId)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const productId = this.props.match.params.productId
    console.log('single product! ', this.props.product)
    return <div>testing 123</div>
  }
}

const mapStateToProps = state => ({
  product: state.product[0]
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductDetail)
