import React, { Component } from 'react'

//https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
//
//https://www.valentinog.com/blog/redux/#React_Redux_tutorial_who_this_guide_is_for
//https://stackoverflow.com/questions/35417507/how-to-make-a-global-error-handler-in-redux-and-override-it-when-needed

import {connect} from "react-redux"
import {registerUser} from "actions/authActions"
import {Link} from "react-router-dom"
import {Form, Input, Error} from "components/formlib"


const initialValues = {
  email: "",
  username: "",
  password: "",
  password_again: "",
}

class RegisterPage extends Component {

  constructor(props){
    super(props)

    this.state = {
      values: {
        email: "",
        username: "",
        password: "",
        password_again: "",
      },
      errors: {},
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.errors != this.props.errors){
        this.setState({errors: newProps.errors })
    }
  } 

  onSubmit = (evt) => {
      const {values} = this.state
      if(values.password !== "" && values.password === values.password_again ){
        const {password_again, ...sendValues} = values
        this.props.dispatch(registerUser(sendValues))
      }else{
        const {errors} = this.state
        errors['password'] = ["password do not match"]
        this.setState({errors})
      }
  }

  render() {
    console.log(this.state)
    return (
      <div className="center-box">
            <h1 className="headline__mega headline__center">Register</h1>

            {this.props.user ? 
              <div className="form-message__success">{this.props.user.username} has been successfuly registered. You can now <Link to="/users/login">Log In</Link></div>
            : null}

            <Form id="register_form" onSubmit={this.onSubmit} className="form form__flex" formVal={this.state} setState={this.setState.bind(this)}>
                <Input type="email" name="email" placeholder="email" className="input__underline input__medium"/>
                <Error name="email" className="form-error"/>
                <Input name="username" placeholder="username" className="input__underline input__medium"/>
                <Error name="username" className="form-error"/>
                <Input type="password" name="password" placeholder="password" className="input__underline input__medium"/>
                <Error name="password" className="form-error"/>
                <Input type="password" name="password_again" placeholder="password again" className="input__underline input__medium"/>
                <button className="button button__medium">Register</button>
            </Form>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.form.errors
})

export default connect(mapStateToProps, null )(RegisterPage)