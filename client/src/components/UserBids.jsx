import React, { Component } from 'react'
import logic from '../logic'
import Bids from './Bids'

class UserBids extends Component{
    state = {
        userId: sessionStorage.getItem('userId') || '',
        token: sessionStorage.getItem('token') || '',
        bidList: []
    }

    componentDidMount(){
        logic.listUserBiddedProducts(this.state.userId, this.state.token)
            .then(({data}) => {       
                this.setState({
                bidList: data
            })})
    }

    render() {

        return <div className="col">
            <div className="row">
                {this.state.bidList === undefined && <h2>You have no bids yet!</h2>}
                {this.state.bidList != undefined && this.state.bidList.map(e => {                 
                    return <Bids product={e} idUser={this.state.userId}/>
                })}
            </div>
        </div>
    }


}

export default UserBids