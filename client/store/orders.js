import axios from 'axios'

// action types

const GET_COMPLETED_ORDERS = 'GET_COMPLETED_ORDERS'

// action creators

const getCompletedOrders = orders => ({
  type: GET_COMPLETED_ORDERS,
  orders
})

// thunk creator

export const fetchCompletedOrders = userId => {
  return async dispatch => {
    const {data: orders} = await axios.get(`/api/users/${userId}/orders`)
    dispatch(getCompletedOrders(orders))
  }
}

// reducer

export default function(state = [], action) {
  switch (action.type) {
    case GET_COMPLETED_ORDERS:
      return action.orders
    default:
      return state
  }
}
