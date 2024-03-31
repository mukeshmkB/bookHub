import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiConstantStatus = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'Failure',
  initial: 'INITIAL',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
}
const settingsSmall = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
}
class Home extends Component {
  state = {topBooks: [], apiStatus: apiConstantStatus.initial}

  componentDidMount() {
    this.getTopBooks()
  }

  getTopBooks = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const jwtToken = Cookies.get('accessToken')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))

      this.setState({
        topBooks: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  navigateBooks = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  succesView = () => {
    const {topBooks} = this.state
    const booksList = topBooks.reverse()

    return (
      <>
        <div className='home-content-slick-contianer'>
          <div className='home-content'>
            <h1 className='home-heading'>Find Your Next Favorite Books?</h1>
            <p className='home-berif-details'>
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              type='button'
              onClick={this.navigateBooks}
              className='books-nav-button small-devices'
            >
              Find Books
            </button>
          </div>
          <div className='slick-books-container'>
            <div className='top-container'>
              <h1 className='top-heading'>Top Rated Books</h1>
              <button
                type='button'
                onClick={this.navigateBooks}
                className='books-nav-button large-devices'
              >
                Find Books
              </button>
            </div>

            <div className='slick-container-large-devices'>
              <Slider {...settings} className='slider'>
                {booksList.map(eachBook => {
                  return (
                    <div className='slick-item' key={eachBook.id}>
                      <Link to={`/books/${eachBook.id}`} className='book-link'>
                        <img
                          className='book-image'
                          src={eachBook.coverPic}
                          alt={eachBook.title}
                        />
                        <h1>{eachBook.title}</h1>
                        <p>{eachBook.authorName}</p>
                      </Link>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  progressView = () => (
    <div className='loader-container' testid='loader'>
      <Loader type='TailSpin' color='#0284C7' height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className='failure-container'>
      <img
        src='https://i.ibb.co/sjX1bfM/Group-7522.png'
        alt='failure view'
        className='failure-image'
      />
      <p className='api-trigger-info'>Something went wrong, Please try again</p>
      <button
        type='button'
        className='api-trigger-button'
        onClick={() => this.getTopBooks()}
      >
        Try Again
      </button>
    </div>
  )

  renderHomeContent = () => {
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
      return <Redirect to='/login' />
    }

    return (
      <div testid='homeContainer' className='home-container'>
        <Header />
        <div className='responsive-home-container'>
          {this.renderHomeContent()}
        </div>
      </div>
    )
  }
}
export default Home
