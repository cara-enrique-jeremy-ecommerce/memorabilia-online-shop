import React from 'react'
import {connect} from 'react-redux'
import SingleProductSnapshot from './SingleProductSnapshot'
import {fetchAllProducts} from '../store/products'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const products = this.props.products

    return (
      <div className="container products">
        {products &&
          products.map(product => {
            return <SingleProductSnapshot key={product.id} product={product} />
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
