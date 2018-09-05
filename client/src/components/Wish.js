import React, { Component } from "react"
import logic from '../logic'

class Wish extends Component {
    state = {
        userId: sessionStorage.getItem('userId') || '',
        token: sessionStorage.getItem('token') || '',
    }

    render() {
        return <div>
            <h2>{this.props.product.title}</h2>
            <ul>
                <li><img src={this.props.product.image} height='200' width='100'></img></li>            
                <li>{this.props.product.description}</li>
            </ul>
            <button onClick={() => this.props.deletewishes(this.props.id)} > DELETE ME</button>
          </div>
  
        }
      }

export default Wish