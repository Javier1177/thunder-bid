import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Product extends Component {
    render() {
        return <div>
            <h2>{this.props.product.title}</h2>
            <ul>
                <li><img src={this.props.product.image} height='200' width='100'></img></li>            
                <li>{this.props.product.description}</li>
                {this.props.product.closed ? <li>Product closed</li> : <li>Product open</li>}
                <li>Auction ends on {this.props.product.finalDate.slice(0,10)} at {this.props.product.finalDate.slice(11,19)}H </li>
            </ul>
            <Link to={`/product/${this.props.product._id}`}><button>Make a bid!</button></Link>
          </div>
        }
      }

export default Product