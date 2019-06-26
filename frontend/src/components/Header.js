import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {logout} from "actions/authActions"

import "style/layout/header.scss"

const Header = ({logout, isAuthenticated}) => (
  <header className="header-primary">

    <div className="header-container container-8">
        <Link to="/"><h2>Logo</h2></Link>

        <nav className="header-nav">
            {!isAuthenticated ? 
              <React.Fragment>
                <Link to="/users/login/" className="link__button-green"> 
                  Login
                </Link>

                <Link to="/users/register/" className="link__button-green">
                    Register
                </Link>
              </React.Fragment>
            :
              <button onClick={(e) => {e.preventDefault(); logout()}} className="link__button-green">
                  Logout
              </button>
            }
        </nav>
    </div>
  </header>
)

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Header)
