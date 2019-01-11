import axios from 'axios'

// action type

const GOT_SINGLE_CATEGORY = 'GOT_SINGLE_CATEGORY'

// action creator

export const gotCurrentCategory = category => {
  return {
    type: GOT_SINGLE_CATEGORY,
    category
  }
}

// thunk creator

export const fetchCurrentCategory = id => async dispatch => {
  try {
    const res = await axios.get(`/api/categories/${id}`)
    dispatch(gotCurrentCategory(res.data))
  } catch (error) {
    console.error(error)
  }
}

// reducer

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_SINGLE_CATEGORY:
      return action.category
    default:
      return state
  }
}
