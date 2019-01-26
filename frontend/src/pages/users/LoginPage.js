import React, { Component } from 'react'
import {connect} from "react-redux"

import {loginUser} from "actions/authActions"

import {Input, Error, Form} from "components/formlib"

class LoginPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      values: {
        username_or_email: "",
        password: "",
      },
      errors: {}
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.errors != this.props.errors){
        this.setState({errors: newProps.errors })
    }
  } 

  onSubmit = (evt) => {
    this.props.dispatch(loginUser(this.state.values))
  }

  render() {
    return (
      <div className="center-box">
        <h1 className="headline__mega headline__center">Login Page</h1>

        <Form onSubmit={this.onSubmit} className="form form__flex" formVal={this.state} setState={this.setState.bind(this)}>
   
          <Input name="username_or_email" placeholder="username or email" className="input__underline input__medium" />
          <Input type="password" name="password" placeholder="password" className="input__underline input__medium" />
          <Error name="non_field_errors" className="form-error"/>
          <button className="button button__medium">Login</button>
        </Form>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  token: state.auth.token,
  errors: state.form.errors,
})

export default connect(mapStateToProps, null)(LoginPage)