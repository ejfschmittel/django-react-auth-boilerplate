import React, { Component } from 'react'

import {InputValueConsumer, InputErrorConsumer} from "./Form"

const InputGroupValueContext = React.createContext({})
const InputGroupErrorContext = React.createContext({})

export const InputGroupConsumer = inputGroupValueContext.Consumer;
export const InputGroupErrorConsumer = inputGroupErrorContext.Consumer;

export default class InputGroup extends Component {

  

  render() {
    return (
      <InputErrorConsumer>
        (error) => (
            <InputValueConsumer>
                (opt) => (
                    <InputGroupValueContext.Provider
                        value={{

                        }}
                    >
                        <InputGroupErrorContext.Provider
                            value={{
                                
                            }}
                        >
                            {this.props.children}
                        </InputGroupErrorContext.Provider>
                    </InputGroupValueContext.Provider>
                )
            </InputValueConsumer>
        )
      </InputErrorConsumer>
    )
  }
}
