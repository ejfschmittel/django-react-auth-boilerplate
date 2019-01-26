import React, { Component } from 'react'

import {Form, Textarea, Input,Select, Option, Error, RadioInput, CheckboxInput} from "components/formlib"

const initialValues = {
    email: "",
    username: "",
    password: "",
    password_again: "",
}

export default class RegisterPageTest extends Component {

    onSubmit = (evt, {values}) => {
        if(values.password !== "" && values.password === values.password_again ){

        }
    }

  render() {
   
    return (
        <div className="center-box">
            <h1 className="headline__mega headline__center">Register</h1>
            <Form id="register_form" onSubmit={this.onSubmit} className="form form__flex" initValues={initialValues}>
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
