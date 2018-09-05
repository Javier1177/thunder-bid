import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import Error404 from './components/Error404'
import Register from './components/Register'
import Login from './components/Login'
import UserWishes from './components/UserWishes'
import UserBids from './components/UserBids'

class App extends Component {
  state = {
    userId: sessionStorage.getItem('userId') || '',
    token: sessionStorage.getItem('token') || ''
  }

  handleLogin = (userId,token) => {
      this.setState({ userId, token })
      sessionStorage.setItem('userId',userId)
      sessionStorage.setItem('token',token)
      this.props.history.push('/')
  }

  isLoggedIn = () => {
    return !!this.state.userId
  }

  handleLogout = e => {
    e.preventDefault()
    this.setState({
      userId:'',
      token:''
    })
    sessionStorage.clear()
  }

  render() {
    return <div>

    <Switch>
      <Route path='/register' render={() => this.isLoggedIn() ? <Redirect to='/' /> : <Register/> } />
      <Route path='/login' render={() => this.isLoggedIn() ? <Redirect to='/'/> : <Login handleLogin={this.handleLogin}/> } />
      <Route path='/user/wishes' render={() => this.isLoggedIn() ? <UserWishes /> : <Redirect to='/' />} />
      <Route path='/user/bids' render={() => this.isLoggedIn() ? <UserBids /> : <Redirect to='/' />} />
      <Route Component={Error404} />
    </Switch>
    </div>
  }
}

export default withRouter(App)