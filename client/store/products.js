import axios from 'axios'

// action types

const GOT_PRODUCTS = 'GOT_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

// initial state

const initialState = []

// action creators

const gotProducts = products => {
  return {
    type: GOT_PRODUCTS,
    products
  }
}

const addProduct = newProduct => {
  return {
    type: ADD_PRODUCT,
    newProduct
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

export const postProduct = newProduct => {
  return async dispatch => {
    const res = await axios.post('/api/products', newProduct)
    const {data: product} = res
    dispatch(addProduct(product))
  }
}

export const fetchProductsInCart = userId => async dispatch => {
  try {
    const currentCart = await axios.get(`/api/orders/${userId}/cart`)
    const {data} = await axios.get(
      `/api/orders/inCart/${currentCart.data[0].id}`
    )
    dispatch(gotProducts(data))
  } catch (err) {
    console.log(err)
  }
}

export const deleteProductInCart = (productId, userId) => async dispatch => {
  try {
    await axios.delete(`/api/orders/removeFromCart?productId=${productId}`)
    dispatch(fetchProductsInCart(userId))
  } catch (err) {
    console.log(err)
  }
}

// reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.newProduct]
    default:
      return state
  }
}
