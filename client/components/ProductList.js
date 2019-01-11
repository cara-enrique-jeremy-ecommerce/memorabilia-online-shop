import React from 'react'
import {connect} from 'react-redux'
import SingleProductSnapshot from './SingleProductSnapshot'
import {fetchCurrentCategory} from '../store/currentCategory'
import {fetchAllProducts} from '../store/products'
import EditProductForm from './EditProductForm'
import AddProductForm from './AddProductForm'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const {products, user, currentCategory} = this.props

    return (
      <div className="container products">
        {user.adminPrivilege && <AddProductForm />}
        {products &&
          (currentCategory.id || this.props.match.params.categoryId
            ? products
                .filter(product => {
                  return (
                    product.categoryId ===
                    (currentCategory.id || this.props.match.params.categoryId)
                  )
                })
                .map(product => {
                  return (
                    <div key={product.id}>
                      <SingleProductSnapshot product={product} />
                      {user.adminPrivilege && (
                        <EditProductForm product={product} />
                      )}
                    </div>
                  )
                })
            : products.map(product => {
                return (
                  <div key={product.id}>
                    <SingleProductSnapshot product={product} />
                    {user.adminPrivilege && (
                      <EditProductForm product={product} />
                    )}
                  </div>
                )
              }))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    currentCategory: state.currentCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts),
    getCurrentCategory: id => dispatch(fetchCurrentCategory(id))
    // clearCurrentCategory: () => dispatch(gotCurrentCategory({}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)

// .filter(product => {
//   return product.categoryId === currentCategory.id
// })
// .map(product => {
//   return (
//     <div key={product.id}>
//       <SingleProductSnapshot product={product} />
//       {user.adminPrivilege && (
//         <EditProductForm product={product} />
//       )}
//     </div>
//   )
// })
