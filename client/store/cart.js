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

const addProductToCart = newCart => ({
  type: ADD_PRODUCT_TO_CART,
  newCart
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
    // let newcart = []
    // cart.forEach(item => {
    //   item.quantityInOrder = item.quantity
    //   newcart.push(item)
    // })

    dispatch(gotUserCart(cart))
  }
}

export const addToCart = (user, product, currentCart) => {
  return async dispatch => {
    let found = false
    let copyCurrentCart = currentCart.slice()

    copyCurrentCart.forEach(item => {
      if (item.id === product.id) {
        found = true
        ++item.quantityInOrder
      }
    })

    if (!found) {
      product.quantityInOrder = 1
      copyCurrentCart.push(product)
    }

    const newCart = copyCurrentCart.map(item => {
      const newItem = {}
      console.log('item:  ', item)
      newItem.id = item.id
      if (item.product) {
        newItem.product = item.product
        newItem.quantity = item.quantity
      } else {
        newItem.product = item
        newItem.quantity = item.quantityInOrder
      }
      return newItem
    })

    console.log(newCart)
    // if (currentCart[product.id]) {
    //   ++addedProduct.quantityInOrder
    // } else {
    //   addedProduct.quantityInOrder = 1
    // }

    dispatch(addProductToCart(newCart))

    if (!user.id) {
      await axios.post(`/api/cart`, newCart)
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
      return action.newCart
    // case UPDATE_CART:
    //   return action.cart
    default:
      return state
  }
}
