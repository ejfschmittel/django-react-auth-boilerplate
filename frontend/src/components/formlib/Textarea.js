import React, { Component } from 'react'

import InputWrapper from "./InputWrapper"

export default class Textarea extends Component {
  render() {
    const {getValue, onChange, name, ...otherProps} = this.props

    const wrapperProps = {
      getValue,
      onChange,
      name,
    }

    const inputProps = {
      name,
      ...otherProps
    }

    return (
        <InputWrapper {...wrapperProps}>
            <textarea {...inputProps}>
              {this.props.children}
            </textarea>
        </InputWrapper>
    )
  }
}
