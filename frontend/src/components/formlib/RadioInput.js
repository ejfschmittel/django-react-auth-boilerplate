import React, { Component } from 'react'

import Input from "./Input"

class RadioInput extends Component {
  render() {

    const {className, children, ...otherProps} =this.props

    const display = children ? children : this.props.text

    return (
      <label className={className}>
        <Input {...otherProps} type="radio" style={{display: "none"}}/>
        {display}
      </label>
    )
  }
}

RadioInput.defaultProps = {
    text: "",
};

export default RadioInput


