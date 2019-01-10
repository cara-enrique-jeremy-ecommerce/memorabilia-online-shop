import axios from 'axios'

// action type

const EDIT_PRODUCT = 'EDIT_PRODUCT'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

// action creator

const editProduct = editedProduct => {
  return {
    type: EDIT_PRODUCT,
    editedProduct
  }
}

const gotSingleProduct = product => {
  return {
    type: GOT_SINGLE_PRODUCT,
    product
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

export const fetchSingleProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(gotSingleProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

// reducer

export default function(state = {}, action) {
  switch (action.type) {
    case EDIT_PRODUCT:
      return action.editedProduct
    case GOT_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
