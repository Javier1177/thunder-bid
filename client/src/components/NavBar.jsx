import React, { Component } from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'

class NavBar extends Component{

    render() {
        return <div>
            {this.props.isLoggedIn() ? <Navbar color="light" light expand="md" id="nav">
          <NavbarBrand href="/">Home</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#/user/bids">Bids</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/user/wishes">My wish list</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.props.handleLogout} href='#/'>Log Out</NavLink>
              </NavItem>
            </Nav>
        </Navbar> : <Navbar color="light" light expand="md" id="nav">
          <NavbarBrand href="/">Home</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/register">Register</NavLink>
              </NavItem>
            </Nav>
        </Navbar>}
      </div>
    }
}

export default NavBar