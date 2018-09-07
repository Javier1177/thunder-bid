import React, { Component } from "react"

class Bid extends Component {
    render() {
        return <div>
            <h2>{this.props.product.title}</h2>
            <ul>
                <li><img src={this.props.product.image} height='200' width='100'></img></li>            
                <li>{this.props.product.description}</li>
                {/* TODO SHOW MY BID PRICE */}
                {/* <li> Your bid to this product: {this.props.product && this.props.product.bids[this.props.product.bids.lastIndexOf(this.props.idUser)].price} €</li> */}
                
            </ul>
          </div>
  
        }
      }

export default Bid