import React, { Component } from 'react'
import logic from '../logic'


class NavBar extends Component{
    state = {
        userId: sessionStorage.getItem('userId') || '',
        token: sessionStorage.getItem('token') || ''
    }

    render() {
        return <div>
            {this.props.isLoggedIn() ? <div>
                <a href='#/'>Home</a>
                <a href='#/user/bids'>Bids</a>
                <a href='#/user/wishes'>Wishes</a>
                <a onClick={this.props.handleLogout} href=''>Logut</a>
            </div> : <div>
                <a href='#/'>Home</a>
                <a href='#/login'>Login</a>
                <a href='#/register'>Register</a>
            </div>}
        </div>
    }
}

export default NavBar