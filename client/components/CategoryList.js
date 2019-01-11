import React from 'react'
import {connect} from 'react-redux'
import SingleCategorySnapshot from './SingleCategorySnapshot'
// import {fetchAllCategories} from '../store/categories'

class CategoryList extends React.Component {
  render() {
    const {categories} = this.props

    return (
      <div className="container categories">
        {categories &&
          categories.map(category => {
            return (
              <div key={category.id}>
                <SingleCategorySnapshot category={category} />
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

export default connect(mapStateToProps)(CategoryList)
