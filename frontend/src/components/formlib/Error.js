import React, { Component } from 'react'

import {InputErrorConsumer} from "./Form"

class Error extends Component {

    renderError = (errors) => {
        const {name, consumer, hide, ...otherProps} = this.props
        const error = errors[name]

        if(hide && !error) return null;

        return <div {...this.props}>{error}</div> 
    }

  render() {

    const Consumer = InputErrorConsumer

    return (
      <Consumer>
        {({errors}) => this.renderError(errors)}
      </Consumer>
    )
  }
}


Error.defaultProps = {
    hide: "true"
}

export default Error