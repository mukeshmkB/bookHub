import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstantStatus = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'Failure',
  initial: 'INITIAL',
}

class BookItemDetails extends Component {
  state = {
    bookDetails: [],
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getBookItemDetails()
  }

  getBookItemDetails = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('accessToken')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        title: data.book_details.title,
        readStatus: data.book_details.read_status,
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
      }
      this.setState({
        bookDetails: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  succesView = () => {
    const {bookDetails} = this.state
    const {
      coverPic,
      authorName,
      title,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetails

    return (
      <>
        <div className="book-details">
          <div className="book-details-content">
            <img className="book-item-image" src={coverPic} alt={title} />
            <div className="book-meta-info">
              <h1 className="book-details-title">{title}</h1>
              <p className="book-author-name">{authorName}</p>
              <div className="book-rating-info">
                <p className="book-rating-label">Avg Rating</p>
                <BsFillStarFill
                  className="rating-icon-small"
                  size={11}
                  style={{
                    color: '#FBBF24',
                    marginLeft: '4px',
                    marginRight: '4px',
                  }}
                />
                
                <p className="book-rating">{rating}</p>
              </div>
              <p className="book-details-status">
                Status: <span className="current-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="separator" />
          <div className="author-detials">
            <h1 className="about-author-head">About Author</h1>
            <p className="about-author">{aboutAuthor}</p>
          </div>
          <div className="book-breif-info">
            <h1 className="about-book-head">About Book</h1>
            <p className="about-book">{aboutBook}</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  progressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://i.ibb.co/sjX1bfM/Group-7522.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="api-trigger-info">Something went wrong, Please try again</p>
      <button
        type="button"
        className="api-trigger-button"
        onClick={() => this.getBookItemDetails()}
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.succesView()
      case apiConstantStatus.inProgress:
        return this.progressView()
      case apiConstantStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div testid="bookItemDetails" className="book-item-details">
        <Header />
        <div className="book-details-responsive">
          {this.renderBookDetails()}
        </div>
      </div>
    )
  }
}
export default BookItemDetails
