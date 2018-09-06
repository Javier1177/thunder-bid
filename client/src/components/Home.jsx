import React, { Component } from 'react'

class Home extends Component {

    state = {

    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return <div> 
            <form >
                <input type='text' name='surname' onChange={this.handleChange}/>
                <input type='radio' value='Movie' name='Movie'/>
                <label>Movie</label>
                <input type='radio' value='Marvel' name='Marvel'/>
                <label>Marvel</label>
                <input type='radio' value='Games' name='Games'/>
                <label>Games</label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    }
}

export default Home