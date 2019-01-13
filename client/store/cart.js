import axios from 'axios'

// action types

const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_USER_CART = 'GET_USER_CART'

// action creators

const addProductToCart = product => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product
  }
}

const gotUserCart = cart => {
  return {
    type: GET_USER_CART,
    cart
  }
}

// thunk creators

// NOT YET USED - CURRENTLY WORKING ON STORING AND RETRIEVING USER CARTS
export const fetchCart = user => {
  return async dispatch => {
    const res = await axios.get(`/cart/${user.id}`)
    const {data: cart} = res
    dispatch(gotUserCart(cart))
  }
}

// THIS IS IN USE - PLEASE DO NOT CHANGE
export const addToCart = (user, product) => {
  return async dispatch => {
    let addedProduct = product
    if (user.id) {
      const res = await axios.post(`/cart/${user.id}`, product)
      addedProduct = res.data
    }
    dispatch(addProductToCart(addedProduct))
  }
}

// reducer

export default function(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return [...state, action.product]
    case GET_USER_CART:
      return action.cart
    default:
      return state
  }
}
