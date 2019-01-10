import React from 'react'

import {Navbar} from './components'
import ProductsNav from './components/ProductsNav'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <ProductsNav />
      <Routes />
    </div>
  )
}

export default App
