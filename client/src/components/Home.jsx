import React, { Component } from 'react'
import logic from '../logic'
import Product from './Product'
import socketIOClient from "socket.io-client"
const socket = socketIOClient('http://localhost:8080')

class Home extends Component {

    state = {
        query: '',
        products: [],
        selectedOption: ''
    }

    componentDidMount() {
        this.fetchProducts()
            .then(() => socket.on('fetch price', () => this.fetchProducts()))
    }

    fetchProducts = () => {
        return logic.listProducts(this.state.query, this.state.selectedOption)
            .then(({ data }) => {
                this.setState({
                    products: data
                })
            })
    }


    findProduct = e => {
        e.preventDefault()
        logic.listProducts(this.state.query, this.state.selectedOption)
            .then(({ data }) => {
                this.setState({
                    products: data
                })
            })
    }

    resetSearch = () => {
        this.setState({
            query: '',
            selectedOption: ''
        })
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    handleCategory = e => {
        const { value } = e.target
        this.setState({
            selectedOption: value,
        })
    }

    render() {
        return <div class="container">
            <div class="row">
                <div class="col-3">
                    <form onSubmit={this.findProduct}>
                        <div class="form-group">
                            <input type="text" class="form-control" value={this.state.query} name='query' onChange={this.handleChange} placeholder="Write something..." />
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value='' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === ''} />
                                    <label class="form-check-label">All</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value='Movies' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Movies'} />
                                    <label class="form-check-label">Movies</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value='Music' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Music'} />
                                    <label class="form-check-label">Music</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value='Marvel' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Marvel'} />
                                    <label class="form-check-label">Marvel</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value='Games' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Games'} />
                                    <label class="form-check-label">Games</label>
                                </div>
                            </div>
                        </div>
                        <button type='submit' class="btn btn-primary mr-2 mt-4">Search</button>
                        <button type="button" className="btn btn-danger mt-4" onClick={this.resetSearch}>Reset</button>
                    </form>
                </div>
                <div class="col-1"></div>
                <div class="col-8">
                    <div className="row">
                        {this.state.products === undefined && <h2>There is no products with these characteristics</h2> }
                        {this.state.products !== undefined && this.state.products.map(e => {
                            return <Product product={e}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
        // return <div> 
        //     <form onSubmit={this.findProduct}>
        //         <input type='text' value={this.state.query} name='query' onChange={this.handleChange}/>
        //         <input type='radio' value='' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === ''}/>
        //         <label>All</label>
        //         <input type='radio' value='Movies' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Movies'}/>
        //         <label>Movies</label>
        //         <input type='radio' value='Music' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Music'}/>
        //         <label>Music</label>
        //         <input type='radio' value='Marvel' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Marvel'}/>
        //         <label>Marvel</label>
        //         <input type='radio' value='Games' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Games'}/>
        //         <label>Games</label>
        //         <button type='submit'>Search</button>
        //         <button type="button" className="btn btn-primary" onClick={this.resetSearch}>Reset</button>
        //     </form>
        //     <div>
        //     {this.state.products === undefined && <h2>There is no products with these characteristics</h2> }
        //     {this.state.products !== undefined && this.state.products.map(e => {
        //         return <Product product={e}/>
        //     })}
        //     </div>
        // </div>
    }
}

export default Home