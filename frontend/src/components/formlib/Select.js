import React, { Component } from 'react'

import InputWrapper from "./InputWrapper"

export default class Select extends Component {
  render() {
    const {getValue, onChange, name, children, ...otherProps} = this.props

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
            <select {...inputProps}>
                {children}
            </select>
        </InputWrapper>
    )
  }
}
