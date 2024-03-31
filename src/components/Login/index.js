import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErr: false, errMsg: ''}

  sucessLogin = accessToken => {
    Cookies.set('jwt_token', accessToken, {expires: 50})

    const {history} = this.props

    history.replace('/')
  }

  failureLogin = errMsg => {
    this.setState({errMsg, showErr: true})
  }

  getAccess = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const token = await response.json()
      const accessToken = token.jwt_token
      this.sucessLogin(accessToken)
    } else {
      const token = await response.json()
      this.failureLogin(token.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {errMsg, showErr, password, username} = this.state
    return (
      <div testid="loginContainer" className="app-container">
        <div className="login-container">
          <div className="image-container-small">
            <img
              src="https://i.ibb.co/NSQKNq9/Ellipse-99.png"
              alt="website login"
              className="small-website-login"
            />
          </div>
          <div className="image-container">
            <img
              src="https://i.ibb.co/k58tR4x/Rectangle-1467.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <div className="form-container">
            <div className="login-field-container">
              <img
                src="https://i.ibb.co/HBJ1xkX/Group-7731.png"
                className="website-logo"
                alt="login website logo"
              />
              <form className="login-form" onSubmit={this.getAccess}>
                <div className="input-body">
                  <label htmlFor="username">Username*</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={this.onChangeUserName}
                    placeholder="Username"
                  />
                </div>
                <div className="input-body">
                  <label htmlFor="password">Password*</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={this.onChangePassword}
                    placeholder="Password"
                  />
                </div>
                {showErr ? <p className="err-message">{errMsg}</p> : null}
                <button className="login-button" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
