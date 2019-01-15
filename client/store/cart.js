import axios from 'axios'
import {ProductList} from '../components'

// ACTION TYPES

const GET_USER_CART = 'GET_USER_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

// ACTION CREATORS

const gotUserCart = cart => ({
  type: GET_USER_CART,
  cart
})

const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

// THUNK CREATORS

export const fetchCart = userId => {
  return async dispatch => {
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
    }
  }
}

// export const addToCart = (user, product, currentCart) => {
//   return async dispatch => {
//     let found = false
//     let copyCurrentCart = currentCart.slice()

//     copyCurrentCart.forEach(item => {
//       if (item.id === product.id) {
//         found = true
//         ++item.quantity
//       }
//     })

//     if (!found) {
//       product.quantityInOrder = 1
//       copyCurrentCart.push(product)
//     }

//     const newCart = copyCurrentCart.map(item => {
//       const newItem = {}

//       newItem.id = item.id
//       if (item.product) {
//         newItem.product = item.product
//         newItem.quantity = item.quantity
//       } else {
//         newItem.product = item
//         newItem.quantity = item.quantityInOrder
//       }
//       return newItem
//     })

//     console.log('new cart for req.session: ', newCart)

//     dispatch(addProductToCart(newCart))

//     if (!user.id) {
//       await axios.post(`/api/cart`, newCart)
//     }

//     // if (user.id) {
//     //   const res = await axios.post(`/api/cart/${user.id}`, product)
//     //   addedProduct = res.data
//     // }
//   }
// }

// reducer

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_CART:
      return action.cart
    case ADD_PRODUCT_TO_CART:
      return {...state, [action.product.id]: action.product}
    default:
      return state
  }
}
