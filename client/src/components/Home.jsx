import React, { Component } from 'react'
import logic from '../logic'
import Product from './Product'
import socketIOClient from "socket.io-client"
const socket = socketIOClient('http://localhost:8080')

class Home extends Component {

    state = {
        query: '',
        category: '',
        products: [],
        selectedOption: ''
    }

    componentDidMount(){
        this.fetchProducts()
        .then(() => socket.on('fetch price', () => this.fetchProducts()))
    }

    fetchProducts = () => {
        return logic.listProducts(this.state.query, this.state.category)
            .then(({data}) => {
                this.setState({
                products: data
            })})
    }


    findProduct = e => {
        e.preventDefault()
        logic.listProducts(this.state.query, this.state.category)
            .then(({data}) => {
                this.setState({
                products: data
            })})
    }

    resetSearch = () => {
        this.setState({
            query: '',
            category:'',
            selectedOption: ''
        })
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]: value,
        })
    }

    handleCategory = e => {
        const {value} = e.target
        this.setState({
            selectedOption: value,
        })
    }

    render(){
        return <div> 
            <form onSubmit={this.findProduct}>
                <input type='text' value={this.state.query} name='query' onChange={this.handleChange}/>
                <input type='radio' value='' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === ''}/>
                <label>All</label>
                <input type='radio' value='Movie' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Movie'}/>
                <label>Movie</label>
                <input type='radio' value='Marvel' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Marvel'}/>
                <label>Marvel</label>
                <input type='radio' value='Games' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Games'}/>
                <label>Games</label>
                <button type='submit'>Submit</button>
                <button onClick={this.resetSearch}>Reset </button>
            </form>
            <div>
            {this.state.products === undefined && <h2>There is no products yet!</h2> }
            {this.state.products !== undefined && this.state.products.map(e => {
                return <Product product={e}/>
            })}
            </div>
        </div>
    }
}

export default Home