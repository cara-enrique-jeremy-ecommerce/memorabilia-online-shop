import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProductDetail extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {
    const {product} = this.props

    return (
      <div className="product-item">
        {product && (
          <div>
            <img className="single-productview" src={product.image} />
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.singleProduct,
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductDetail)
