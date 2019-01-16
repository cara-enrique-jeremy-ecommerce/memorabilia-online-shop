import axios from 'axios'

// ACTION TYPES

const GET_USER_CART = 'GET_USER_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

// ACTION CREATORS

const gotUserCart = cart => ({
  type: GET_USER_CART,
  cart
})

const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

const removeProductFromCart = productId => ({
  type: REMOVE_PRODUCT_FROM_CART,
  productId
})

// THUNK CREATORS

export const fetchCart = userId => {
  return async dispatch => {
    console.log('fetchCart userId: ', userId)
    if (userId) {
      const res = await axios.get(`/api/users/${userId}/cart`)
      const {data: cart} = res
      const objectCart = {}
      cart.forEach(item => {
        objectCart[item.productId] = item.product
        objectCart[item.productId].quantityInOrder = item.quantity
      })
      dispatch(gotUserCart(objectCart))
    } else {
      const res = await axios.get('/api/cart')
      const {data: cart} = res
      console.log('guest cart from server: ', cart)
      dispatch(gotUserCart(cart))
    }
  }
}

export const addToCart = (user, product, currentCart) => {
  return async dispatch => {
    const addedProduct = Object.assign({}, product)
    if (currentCart[product.id]) {
      addedProduct.quantityInOrder = currentCart[product.id].quantityInOrder + 1
    } else {
      addedProduct.quantityInOrder = 1
    }
    dispatch(addProductToCart(addedProduct))

    if (!user.id) {
      await axios.post(`/api/cart`, addedProduct)
    } else {
      await axios.post(`/api/users/${user.id}/cart`, addedProduct)
    }
  }
}

export const removeFromCart = (userId, productId) => {
  return async dispatch => {
    dispatch(removeProductFromCart(productId))
    if (!userId) {
      await axios.delete('/api/cart', {data: {productId}})
    } else {
      await axios.delete(`/api/users/${userId}/cart`, {data: {productId}})
    }
  }
}

// reducer

export default function(state = {}, action) {
  const newState = {...state}
  switch (action.type) {
    case GET_USER_CART:
      return action.cart
    case ADD_PRODUCT_TO_CART:
      return {...state, [action.product.id]: action.product}
    case REMOVE_PRODUCT_FROM_CART:
      delete newState[action.productId]
      return newState
    default:
      return state
  }
}
