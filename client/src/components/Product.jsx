import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Product extends Component {
    render() {
        return <div>
            <h2>{this.props.product.title}</h2>
            <ul>
                {this.props.product.closed ? <li>Product closed</li> : <li>Auction ends on {this.props.product.finalDate.slice(0,10)} at {this.props.product.finalDate.slice(11,19)}H </li>}
                <li><img src={this.props.product.image} height='200' width='100'></img></li>            
                <li> {this.props.product && this.props.product.bids.length ? this.props.product.bids[this.props.product.bids.length-1].price : this.props.product.initialPrice} €</li>

            </ul>
            <Link to={`/product/${this.props.product._id}`}><button>See more</button></Link>
          </div>
        }
      }

export default Product