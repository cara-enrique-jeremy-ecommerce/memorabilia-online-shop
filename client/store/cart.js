import axios from 'axios'

// action types

const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_USER_CART = 'GET_USER_CART'
const UPDATE_CART = 'UPDATE_CART'

// action creators

const addProductToCart = product => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product
  }
}

const updateCart = cart => {
  return {
    type: UPDATE_CART,
    cart
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

export const addToCart = (user, product, currentCart) => {
  return async dispatch => {
    let addedProduct = product

    if (currentCart[product.id]) {
      ++addedProduct.quantityInOrder
    } else {
      addedProduct.quantityInOrder = 1
    }

    dispatch(addProductToCart(addedProduct))

    await axios.post(`/api/cart`, product)

    // if (user.id) {
    //   const res = await axios.post(`/api/cart/${user.id}`, product)
    //   addedProduct = res.data
    // }
  }
}

// reducer

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {...state, [action.product.id]: action.product}
    case GET_USER_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}
