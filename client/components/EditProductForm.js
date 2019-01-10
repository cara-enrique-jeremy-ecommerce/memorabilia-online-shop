import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/singleProduct'

class EditProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      description: '',
      quantity: '',
      categoryId: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState(this.props.product)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.editProduct(this.props.product.id, this.state)
  }

  render() {
    const {name, price, description, quantity} = this.state

    return (
      <div>
        <h3>EDIT PRODUCT DETAILS</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <p />
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={this.handleChange}
          />
          <p />
          <label>Description</label>
          <textarea
            rows="5"
            cols="100"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <p />
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            value={quantity}
            onChange={this.handleChange}
          />
          <p />
          <button type="submit">Update Product</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProduct: (productId, updatedProduct) =>
      dispatch(updateProduct(productId, updatedProduct))
  }
}

export default connect(null, mapDispatchToProps)(EditProductForm)
