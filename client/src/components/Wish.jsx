import React, { Component } from "react"
import { Link } from 'react-router-dom'

class Wish extends Component {
    render() {
        return <div className="col-3 mt-3">
            <div class="card">
                {this.props.product.closed ? <p class="card-text" style={{ border: '1px solid red', textAlign: 'center', margin: '10px', padding: '5px', borderRadius: '2px', color: 'white', backgroundColor: 'red' }}>Product closed</p> : <p style={{ border: '1px solid green', textAlign: 'center', margin: '10px', padding: '5px', borderRadius: '2px', color: 'white', backgroundColor: 'green' }}>{this.props.product.finalDate.slice(0, 10)} at {this.props.product.finalDate.slice(11, 19)}H</p>}
                <div className='card-img-top mt-4' style={{ backgroundImage: `url(${this.props.product.image})`, height: '100px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                <div class="card-body">
                    <h5 class="card-title text-center">{this.props.product.title}</h5>
                    <p style={{textAlign: 'center', fontSize: '20px'}}>{this.props.product && this.props.product.bids.length ? this.props.product.bids[this.props.product.bids.length - 1].price : this.props.product.initialPrice} €</p>
                    <br />
                    <Link to={`/product/${this.props.product._id}`}><button class="btn btn-info ml-2">See more</button></Link>
                    <button class="btn btn-danger ml-4" onClick={() => this.props.deletewishes(this.props.id)}>Delete wish</button>
                </div>
            </div>
            <br />
        </div>
    }
}

export default Wish