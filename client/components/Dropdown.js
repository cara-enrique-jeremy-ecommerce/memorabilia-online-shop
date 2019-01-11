import React from 'react'
import {Link} from 'react-router-dom'

class Dropdown extends React.Component {
  constructor() {
    super()

    this.state = {
      displayMenu: false
    }

    this.showDropdownMenu = this.showDropdownMenu.bind(this)
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
  }

  showDropdownMenu(event) {
    event.preventDefault()
    this.setState({displayMenu: true}, () => {
      document.addEventListener('click', this.hideDropdownMenu)
    })
  }

  hideDropdownMenu() {
    this.setState({displayMenu: false}, () => {
      document.removeEventListener('click', this.hideDropdownMenu)
    })
  }

  render() {
    return (
      <div className="dropdown" style={{width: '200px'}}>
        <div className="dropdown-button" onClick={this.showDropdownMenu}>
          Choose a Collection
        </div>

        {this.state.displayMenu ? (
          <ul>
            {this.props.categories.map(category => {
              return (
                <Link
                  key={category.id}
                  to={`/categories/${category.id}`}
                  onClick={() => this.props.setCurrentCategory(category.id)}
                >
                  <li>{category.title}</li>
                </Link>
              )
            })}
          </ul>
        ) : null}
      </div>
    )
  }
}

export default Dropdown
