import axios from 'axios'

// ACTION TYPES

const GET_USER_CART = 'GET_USER_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const UPDATE_CART = 'UPDATE_CART'

// ACTION CREATORS

const gotUserCart = cart => ({
  type: GET_USER_CART,
  cart
})

const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

// const updateCart = cart => {
//   return {
//     type: UPDATE_CART,
//     cart
//   }
// }

// THUNK CREATORS

export const fetchCart = userId => {
  return async dispatch => {
    const res = await axios.get(`/api/users/${userId}/cart`)
    const {data: cart} = res
    let newcart = []
    cart.forEach(item => {
      item.quantityInOrder = item.quantity
      newcart.push(item)
    })

    dispatch(gotUserCart(newcart))
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

    if (!user.id) {
      await axios.post(`/api/cart`, addedProduct)
    }

    // if (user.id) {
    //   const res = await axios.post(`/api/cart/${user.id}`, product)
    //   addedProduct = res.data
    // }
  }
}

// reducer

export default function(state = [], action) {
  switch (action.type) {
    case GET_USER_CART:
      return action.cart
    case ADD_PRODUCT_TO_CART:
      return {...state, [action.product.id]: action.product}
    // case UPDATE_CART:
    //   return action.cart
    default:
      return state
  }
}
