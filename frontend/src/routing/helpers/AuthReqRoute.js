import React from 'react'
import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"

//https://github.com/bradtraversy/lead_manager_react_django/blob/master/leadmanager/frontend/src/components/common/PrivateRoute.js


const AuthReqRoute = ({component: Component, isAuthenticated, loading, ...rest}) => (
  <Route 
    {...rest}

    render={props => {
      if (loading) {
        return <h2>Loading...</h2>;
      } else if (!isAuthenticated) {
        return ( 
          <Redirect to={{
            pathname: "/users/login/",
            state: {referrer: rest.location.pathname}
          }}/>
        ) 
      } else {
        return <Component {...props} />;
      }
    }}

  />
)

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading
})

export default connect(mapStateToProps, {})(AuthReqRoute)
