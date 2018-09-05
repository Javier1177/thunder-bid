import React, { Component } from "react"

class Bid extends Component {
    render() {
        return <div>
            <h2>{this.props.product.title}</h2>
            <ul>
                <li><img src={this.props.product.image} height='200' width='100'></img></li>            
                <li>{this.props.product.description}</li>
            </ul>
          </div>
  
        }
      }

export default Bid