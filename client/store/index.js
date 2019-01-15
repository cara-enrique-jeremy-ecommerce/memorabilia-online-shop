import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import categories from './categories'
import products from './products'
import singleProduct from './singleProduct'
import currentCategory from './currentCategory'
import cart from './cart'
import orders from './orders'

const reducer = combineReducers({
  user,
  categories,
  currentCategory,
  products,
  singleProduct,
  cart,
  orders
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
