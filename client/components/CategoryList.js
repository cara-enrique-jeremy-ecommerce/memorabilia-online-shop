import React from 'react'
import {connect} from 'react-redux'
import SingleCategorySnapshot from './SingleCategorySnapshot'
import {Link} from 'react-router-dom'

class CategoryList extends React.Component {
  render() {
    const {categories, user} = this.props

    return (
      <div className="container categories">
        {user.adminPrivilege && (
          <Link to="/add-product">
            <div className="add-to-cart-btn">Add Product</div>
          </Link>
        )}
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
  categories: state.categories,
  user: state.user
})

export default connect(mapStateToProps)(CategoryList)
