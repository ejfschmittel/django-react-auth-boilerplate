import React, { Component } from 'react'


import {InputValueConsumer} from "./Form"


/*
    props: getValue, name, 
*/

export default class InputWrapper extends Component {
    // renders Child and injects props value and onchange
    renderChild = ({values, setState, getValue, onChange}) => {
        const {children, name} = this.props

        // use given props function if there, otherwise chose propagated function
        const commonProps = {
            value: this.props.getValue ? this.props.getValue(values,name) : getValue(values, name),
            onChange: (e) => this.props.onChange ? this.props.onChange(e,values, setState) : onChange(e, values, setState)
        }

        const child = React.Children.only(children)
        return React.cloneElement(child, {...commonProps, ...child.props, name: name})
    }

  render() {
    const Consumer = InputValueConsumer

    return (
        <Consumer>
            {(opt) => this.renderChild(opt)}
        </Consumer>
    )
  }
}
