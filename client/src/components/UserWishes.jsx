import React, { Component } from 'react'
import logic from '../logic'
import Wish from './Wish'

class UserWishes extends Component{
    state = {
        userId: sessionStorage.getItem('userId') || '',
        token: sessionStorage.getItem('token') || '',
        wishList: []
    }

    componentDidMount(){
        logic.listUserWishes(this.state.userId, this.state.token)
            .then(({data}) => {
                this.setState({
                wishList: data
            })})
    }

    deletewishes = productId => {
        logic.deleteWish(productId, this.state.userId, this.state.token)
            .then(() => logic.listUserWishes(this.state.userId, this.state.token))
            .then(({data}) => {
                this.setState({
                wishList: data
            })})
    }

    render() {

        return <div>
            {this.state.wishList === undefined && <h2>You have no wishes yet!</h2> }
            {this.state.wishList != undefined && this.state.wishList.map(e => {
                return <Wish deletewishes={this.deletewishes} id={e._id} key={e} product={e}/>
            })}
        </div>
    }


}

export default UserWishes