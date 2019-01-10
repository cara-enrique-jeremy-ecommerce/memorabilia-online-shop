import axios from 'axios'

// action types

const GOT_CATEGORIES = 'GOT_CATEGORIES'

// initial state

const initialState = []

// action creators

const gotCategories = categories => {
  return {
    type: GOT_CATEGORIES,
    categories
  }
}

// thunk creator

export const fetchAllCategories = async dispatch => {
  try {
    const res = await axios.get('/api/categories')
    dispatch(gotCategories(res.data))
  } catch (error) {
    console.log(error)
  }
}

// reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
