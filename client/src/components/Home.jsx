import React, { Component } from 'react'
import logic from '../logic'
import Product from './Product'

class Home extends Component {

    state = {
        query: '',
        category: '',
        products: []
    }

    componentDidMount(){
        logic.listProducts(this.state.query, this.state.category)
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
            category:''
        })
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return <div> 
            <form onSubmit={this.findProduct}>
                <input type='text' value={this.state.query} name='query' onChange={this.handleChange}/>
                <input type='radio' value='' name='category' onChange={this.handleChange} />
                <label>All</label>
                <input type='radio' value='Movie' name='category' onChange={this.handleChange}/>
                <label>Movie</label>
                <input type='radio' value='Marvel' name='category' onChange={this.handleChange}/>
                <label>Marvel</label>
                <input type='radio' value='Games' name='category' onChange={this.handleChange}/>
                <label>Games</label>
                <button type='submit'>Submit</button>
                <button onClick={this.resetSearch}>resetSearch</button>
            </form>
            <div>
            {this.state.products === undefined && <h2>There is no products yet!</h2> }
            {this.state.products != undefined && this.state.products.map(e => {
                
                return <Product product={e}/>
            })}
            </div>
        </div>
    }
}

export default Home