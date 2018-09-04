import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Register extends Component{
    state = {
        email: '',
        password: '',
        name: '',
        surname: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e =>{
        e.preventDefault()

        const {email, password, name, surname } = this.state
        logic.register(email, password, name, surname)
            .then(() => this.props.history.push('/login'))
            .catch(({message}) => console.log(message))
    }

    render() {

        return <div>
            <h1>REGISTER</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Email*</label>
                <input type='email' onChange={this.handleChange} name='email'/>
                <label>Password*</label>
                <input type='password' name='password' onChange={this.handleChange}/>
                <label>Name*</label>
                <input type='text' name='name' onChange={this.handleChange}/>
                <label>Surname*</label>
                <input type='text' name='surname' onChange={this.handleChange}/>
                <button type='submit'>Submit</button>
            </form>
        </div>

    }
}

export default withRouter(Register)