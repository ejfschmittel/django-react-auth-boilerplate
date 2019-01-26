import React, { Component } from 'react'


const inputValueContext = React.createContext({})
const inputErrorContext = React.createContext({})

export const InputValueConsumer = inputValueContext.Consumer;
export const InputErrorConsumer = inputErrorContext.Consumer;

//TODO: propagate getValue, onChange, 


export default class Form extends Component {

    constructor(props){
        super(props)

        /*this.state = {
            values: {...this.props.initValues}, 
            errors: { ...this.props.initErrors},
        }*/
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e)
    }

    getValue = (values, name) => {
        if(this.props.getValue) return this.props.getValue(values, name);
        return values[name]
    }

    onChange = (e, values, setState) => {
        const {name, value} = e.target
        values[name] = value
        setState({values})
    }

  render() {
    const {children, className} = this.props

    return (
        <form className={className} onSubmit={this.onSubmit}>
            <inputValueContext.Provider
                value={{
                    values: this.props.formVal.values,
                    getValue: this.getValue,
                    onChange: this.onChange,
                    setState: this.props.setState,
                }}
            >
                <inputErrorContext.Provider
                    value={{
                        errors: this.props.formVal.errors,
                    }}
                >
                    {children}
                </inputErrorContext.Provider>
            </inputValueContext.Provider>
        </form>
    )
  }
}
