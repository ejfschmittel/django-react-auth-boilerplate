import React, { Component } from 'react'

import InputWrapper from "./InputWrapper"

export default class Input extends Component {
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
      <input {...inputProps} />
    </InputWrapper>
    )
  }
}
