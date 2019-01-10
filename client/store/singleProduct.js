import axios from 'axios'

// action type

const EDIT_PRODUCT = 'EDIT_PRODUCT'

// action creator

const editProduct = editedProduct => {
  return {
    type: EDIT_PRODUCT,
    editedProduct
  }
}

// thunk creator

export const updateProduct = (productId, updatedProduct) => {
  return async dispatch => {
    const res = await axios.put(`/api/products/${productId}`, updatedProduct)
    const {data: product} = res
    dispatch(editProduct(product))
  }
}

// reducer

export default function(state = {}, action) {
  switch (action.type) {
    case EDIT_PRODUCT:
      return action.editedProduct
    default:
      return state
  }
}
