import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        const {email, password} = this.state
        logic.login(email, password)
            .then(res => {
                this.props.handleLogin(res.id, res.token)
            })
    }

    render() {

        return <div>
            <h1>LOGIN</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Email*</label>
                <input type="email" onChange={this.handleChange} name="email" />
                <label>Password*</label>
                <input type="password" name="password" onChange={this.handleChange} />

                <button type="submit">Submit</button>
            </form>
        </div>

    }
}

export default withRouter(Login)