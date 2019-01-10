import React from 'react'
import {connect} from 'react-redux'
import SingleProductSnapshot from './SingleProductSnapshot'
import {fetchAllProducts} from '../store/products'
import EditProductForm from './EditProductForm'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const products = this.props.products
    const user = this.props.user

    return (
      <div>
        {products &&
          products.map(product => {
            return (
              <div key={product.id}>
                <SingleProductSnapshot product={product} />
                {user.adminPrivilege && <EditProductForm product={product} />}
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
