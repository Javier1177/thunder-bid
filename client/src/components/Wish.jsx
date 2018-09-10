import React, { Component } from "react"
import {Link} from 'react-router-dom'

class Wish extends Component {
    render() {
        return <div>
            <h2>{this.props.product.title}</h2>
            <ul>
                <li><img src={this.props.product.image} height='200' width='100'></img></li>            
                <li>{this.props.product.description}</li>
            </ul>
            <button onClick={() => this.props.deletewishes(this.props.id)}>DELETE ME</button>
            <Link to={`/product/${this.props.product._id}`}><button>See product</button></Link>
          </div>
  
        }
      }

export default Wish