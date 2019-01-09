import axios from 'axios'

// action types

const GOT_PRODUCTS = 'GOT_PRODUCTS'

// initial state

const initialState = []

// action creators

const gotProducts = products => {
  return {
    type: GOT_PRODUCTS,
    products
  }
}

// thunk creator

export const fetchAllProducts = async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(gotProducts(res.data))
  } catch (error) {
    console.log(error)
  }
}

// reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    default:
      return state
  }
}
