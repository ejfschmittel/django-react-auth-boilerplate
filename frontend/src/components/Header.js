import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class Header extends Component {
  render() {
    return (
      <header className="header-primary">

        <div className="container-8 header-container">
            <h2>Logo</h2>

            <nav className="header-nav">
                <Link to="/users/login/" className="link__button-green"> 
                    Login
                </Link>

                <Link to="/users/register/" className="link__button-green">
                    Register
                </Link>
            </nav>
        </div>
      </header>
    )
  }
}
