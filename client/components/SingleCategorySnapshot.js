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
  // componentDidMount() {
  //   this.props.getCurrentCategory(this.props.category.id)
  // }

  handleChange() {
    this.props.getCurrentCategory(this.props.category.id)
  }

  render() {
    const {id, title, imageURL} = this.props.category

    return (
      <div className="category-item">
        <p>{title}</p>
        <Link to={`/categories/${id}`} onClick={() => this.handleChange()}>
          <img className="category-snapshot" src={imageURL} />
        </Link>
      </div>
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
