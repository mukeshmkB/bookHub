import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import AsideBar from '../AsideBar'
import Footer from '../Footer'
import BookItem from '../BookItem'
import './index.css'

const apiConstantStatus = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'Failure',
  initial: 'INITIAL',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    booksList: [],
    bookshelfName: bookshelvesList[0].value,
    searchValue: '',
    apiStatus: apiConstantStatus.initial,
  }

  getBooksDetails = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})

    const {bookshelfName, searchValue} = this.state

    const jwtToken = Cookies.get('accessToken')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchValue}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(eachBooks => ({
        id: eachBooks.id,
        authorName: eachBooks.author_name,
        coverPic: eachBooks.cover_pic,
        rating: eachBooks.rating,
        title: eachBooks.title,
        readStatus: eachBooks.read_status,
      }))

      this.setState({
        booksList: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  componentDidMount = () => {
    this.getBooksDetails()
  }

  changeShelve = activeShelf => {
    this.setState({bookshelfName: activeShelf}, this.getBooksDetails)
  }

  enterBookName = event => {
    this.setState({searchValue: event.target.value})
  }

  searchBook = () => {
    this.getBooksDetails()
  }

  succesView = () => {
    const {booksList, searchValue, bookshelfName} = this.state
    const showBookList = booksList.length > 0
    const bookShelfLabel = () => {
      const findShelf = bookshelvesList.find(
        eachShelf => eachShelf.value === bookshelfName,
      )
      return findShelf.label
    }
    return (
      <>
        <div className="asidebar-large-device">
          <AsideBar
            changeShelve={this.changeShelve}
            bookshelvesList={bookshelvesList}
            bookshelfName={bookshelfName}
          />
        </div>
        <div className="books-container">
          <div className="top-search">
            <h1 className="top-heading">{bookShelfLabel()} Books</h1>
            <div className="search-container">
              <input
                type="search"
                className="searchInput"
                value={searchValue}
                placeholder="Search"
                onChange={this.enterBookName}
              />
              <button
                type="button"
                arial-label="search"
                testid="searchButton"
                className="search-button"
                onClick={this.searchBook}
              >
                <BsSearch size={16} style={{color: '94A3B8'}} />
              </button>
            </div>
          </div>
          <div className="asidebar-small-device">
            <AsideBar
              changeShelve={this.changeShelve}
              bookshelvesList={bookshelvesList}
              bookshelfName={bookshelfName}
            />
          </div>
          {showBookList ? (
            <>
              <ul className="book-lists">
                {booksList.map(eachBook => (
                  <BookItem key={eachBook.id} bookDetails={eachBook} />
                ))}
              </ul>
              <Footer />
            </>
          ) : (
            <div className="no-result-container">
              <div className="no-result-content">
                <img
                  src="https://i.ibb.co/tCvYHTW/Asset-1-1.png"
                  alt="no books"
                  className="no-books"
                />
                <p className="no-result-content">
                  Your search for {searchValue} did not find any matches.
                </p>
              </div>
            </div>
          )}
        </div>
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
        onClick={() => this.getBooksDetails()}
      >
        Try Again
      </button>
    </div>
  )

  renderBookContent = () => {
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
    const accessToken = Cookies.get('jwt_token')
    if (accessToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div testid="bookShelves" className="book-shelves-container">
        <Header />
        <div className="responsive-shelves-container">
          {this.renderBookContent()}
        </div>
      </div>
    )
  }
}
export default Bookshelves
