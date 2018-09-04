import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import Error404 from './components/Error404'
import Register from './components/Register'
import Login from './components/Login'


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

  handleLogout = (e) => {
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
      <Route path='/register' render={() => this.state.isLoggedIn ? <Redirect to='/home' /> : <Register/> } />
      <Route path='/login' render={() => this.state.isLoggedIn ? <Redirect to='/home'/> : <Login handleLogin={this.handleLogin}/> } />
      <Route Component={Error404} />
    </Switch>
    </div>
  }
}

export default withRouter(App)