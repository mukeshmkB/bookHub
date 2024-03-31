import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, authorName, coverPic, rating, title, readStatus} = bookDetails
  return (
    <li className="book-list-item">
      <Link className="link-item" to={`/books/${id}`}>
        <div className="book-item">
          <img src={coverPic} alt={title} />
          <div className="meta-info">
            <h1 className="book-title">{title}</h1>
            <p className="author-name">{authorName}</p>
            <div className="rating-info">
              <p className="rating-label">Avg Rating</p>

              <BsFillStarFill
                size={10}
                style={{
                  marginLeft: '4px',
                  marginRight: '4px',
                  color: 'FBBF24',
                }}
              />
              <p className="rating">{rating}</p>
            </div>
            <p className="book-status">
              Status: <span className="status">{readStatus}</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default BookItem
