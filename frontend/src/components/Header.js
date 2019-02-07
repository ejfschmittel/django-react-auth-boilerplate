import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {logout} from "actions/authActions"

class Header extends Component {
  render() {
    return (
      <header className="header-primary">

        <div className="container-8 header-container">
            <h2>Logo</h2>

            <nav className="header-nav">
                {!this.props.isAuthenticated ? 
                  <React.Fragment>
                    <Link to="/users/login/" className="link__button-green"> 
                      Login
                    </Link>

                    <Link to="/users/register/" className="link__button-green">
                        Register
                    </Link>
                  </React.Fragment>
                :
                  <button onClick={(e) => {e.preventDefault(); this.props.logout()}} className="link__button-green">
                      Logout
                  </button>
                }
            </nav>
        </div>
      </header>
    )
  }
}

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Header)
/*
*/