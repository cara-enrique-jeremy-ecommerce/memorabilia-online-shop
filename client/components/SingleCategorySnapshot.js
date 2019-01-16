import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCurrentCategory} from '../store/currentCategory'

class SingleCategorySnapshot extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.props.getCurrentCategory(this.props.category.id)
  }

  render() {
    const {id, title, imageURL} = this.props.category

    return (
      <Link to={`/categories/${id}`} onClick={() => this.handleChange()}>
        <div className="category-item">
          <img className="category-snapshot" src={imageURL} />
          <p>{title}</p>
        </div>
      </Link>
    )
  }
}

/**
 * CONTAINER
 */

const mapDispatch = dispatch => ({
  getCurrentCategory: id => dispatch(fetchCurrentCategory(id))
})

export default connect(null, mapDispatch)(SingleCategorySnapshot)

/**
 * PROP TYPES
 */
SingleCategorySnapshot.propTypes = {
  getCurrentCategory: PropTypes.func.isRequired
}
