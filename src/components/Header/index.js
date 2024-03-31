import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
    <div className="navbar-content-small">
        <Link to="/">
          <img
            src="https://i.ibb.co/HBJ1xkX/Group-7731.png"
            alt="website logo"
            className="small-website-logo"
          />
        </Link>
        <button type="button" className="menu-icon">
          <GiHamburgerMenu size={22} />
        </button>
      </div>
      <nav className="navbar-content-large">
        <Link to="/">
          <img
            src="https://i.ibb.co/HBJ1xkX/Group-7731.png"
            alt="website logo"
            className="head-website-logo"
          />
        </Link>
        <ul className="nav-items">
          <li className="nav-item">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link" to="/shelf">
              Bookshelves
            </Link>
          </li>
          <li>
            {' '}
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default withRouter(Header)
