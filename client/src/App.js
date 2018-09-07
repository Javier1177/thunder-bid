import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import Error404 from './components/Error404'
import Register from './components/Register'
import Login from './components/Login'
import UserWishes from './components/UserWishes'
import UserBids from './components/UserBids'
import NavBar from './components/NavBar'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'

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
    this.props.history.push('/')
    
  }

  render() {
    return <div>
      <NavBar isLoggedIn={this.isLoggedIn} handleLogout={this.handleLogout}/>
    <Switch>
      <Route exact path='/' render={() => <Home/>} />
      <Route path='/register' render={() => this.isLoggedIn() ? <Redirect to='/' /> : <Register/> } />
      <Route path='/login' render={() => this.isLoggedIn() ? <Redirect to='/'/> : <Login handleLogin={this.handleLogin}/> } />
      <Route path='/user/wishes' render={() => this.isLoggedIn() ? <UserWishes /> : <Redirect to='/' />} />
      <Route path='/user/bids' render={() => this.isLoggedIn() ? <UserBids /> : <Redirect to='/' />} />
      <Route path='/product/:id' render={(props) => <ProductDetail id={props.match.params.id}/> }/>
      <Route Component={Error404} />
    </Switch>
    </div>
  }
}

export default withRouter(App)