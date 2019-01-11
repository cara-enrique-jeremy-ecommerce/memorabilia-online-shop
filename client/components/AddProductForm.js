import React from 'react'
import {connect} from 'react-redux'
import {postProduct} from '../store/products'

class AddProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      description: '',
      quantity: '',
      categoryId: 1 // THIS IS A PLACEHOLDER UNTIL CATEGORY REDUCER IS COMPLETE
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postProduct(this.state)
  }

  render() {
    const {name, price, description, quantity} = this.state

    return (
      <div>
        <h3>ADD PRODUCT</h3>
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
          <button type="submit">Add Product</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postProduct: newProduct => dispatch(postProduct(newProduct))
  }
}

export default connect(null, mapDispatchToProps)(AddProductForm)
