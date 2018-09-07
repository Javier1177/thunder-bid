import React, { Component } from "react"
import logic from '../logic'

class ProductDetail extends Component {
    state = {
        userId: sessionStorage.getItem('userId') || '',
        token: sessionStorage.getItem('token') || '',
        product: '',
        productId: '',
        productPrice: ''
    }

    componentDidMount(){
        return logic.retrieveProduct(this.props.id)
            .then(({data}) => {
                this.setState({
                    product: data,
                    productId: data._id
                })
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e =>{
        e.preventDefault()
        const {userId, token, productPrice, productId } = this.state
        const bidPrice = Number(productPrice)
        logic.addBid(productId, userId, bidPrice, token)
            .catch(({message}) => console.log(message))
    }

    saveWish = e => {
        e.preventDefault()
        const { productId, userId, token } = this.state

        logic.addWish(productId, userId, token)
            .catch(({message}) => console.log(message))

    }

    render() {
        return <div>
            <h1>{this.state.product.title}</h1>
            <img src={this.state.product.image} width='200'/>
            <div> Price: {this.state.product && this.state.product.bids.length ? this.state.product.bids[this.state.product.bids.length-1].price : this.state.product.initialPrice} €</div>
            
            <form onSubmit={this.handleSubmit}>
                <input type='number' name='productPrice' onChange={this.handleChange}/>
                <button type='submit'>Make the bid!</button>
            </form>
            <button onClick={this.saveWish}>Mark it as a wish!</button>
        </div>
    }
}
export default ProductDetail