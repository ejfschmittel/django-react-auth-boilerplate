import React, { Component } from 'react'

export default class Option extends Component {
  render() {

    const {children, ...otherProps} = this.props

    return (
      <option {...otherProps}>
          {children}
      </option>
    )
  }
}
