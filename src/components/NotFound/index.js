import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://i.ibb.co/Z6VqDdX/Group-7484.png"
      alt="not found"
      className="not-found-large"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="regret-text">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/" className="link">
      <button type="button" className="go-home-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
