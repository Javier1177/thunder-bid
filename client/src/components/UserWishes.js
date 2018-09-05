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
        logic.deleteWish(productId, this.state.userId, this.state.wishList)
            .then(() => logic.listUserWishes(this.state.userId, this.state.token))
            .then(({data}) => {
                this.setState({
                wishList: data
            })})
    }

    render() {


        //TODO Delete wishes(no pilla el id)
        return <div>
            {this.state.wishList.map(e => {
                debugger
                return <Wish deletewishes={this.deletewishes} id={e._id} key={e} product={e}/>
                //<div>{e.title}</div>
            })}
        </div>
    }


}

export default UserWishes