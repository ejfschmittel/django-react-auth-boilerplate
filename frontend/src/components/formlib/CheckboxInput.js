import React, { Component } from 'react'

import Input from "./Input"

class CheckboxInput extends Component {
  render() {

    const {className, children, ...otherProps} =this.props

    const display = children ? children : this.props.text

    return (
      <label className={className}>
        <Input {...otherProps} type="checkbox" style={{display: "none"}}/>
        {display}
      </label>
    )
  }
}

CheckboxInput.defaultProps = {
    text: "",
};

export default CheckboxInput
