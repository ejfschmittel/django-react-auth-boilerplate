import React, { Component } from 'react'
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

export default class StyleTest extends Component {
    constructor(props){
        super(props);

        this.state = {
            items: [
                "item 1",
                "item 2",
                "item 3",
                "item 4",
                "item 5"
            ],
            text: ""
        }
    }

    removeItem = (id) => {
        const newItems = this.state.items.slice();
        newItems.splice(id, 1)
        this.setState({items: newItems})
    }

    addItem = (e) => {
        this.setState({items: this.state.items.concat(this.state.text)})
    }

    onChange = (e) => {
        this.setState({text: e.target.value})
    }

  render() {

    return (
      <div className="center-box">
        <h1>Style test</h1>
        <input type="text" name="input" value={this.state.text} onChange={this.onChange} />
        <button onClick={this.addItem}>add</button>
            <div className="my-grid">
                <TransitionGroup>
                    {this.state.items.map((item, id) => 
                        <div className="item" key={"item" + id} onClick={() => this.removeItem(id)}>{item}</div>
                    )}
                </TransitionGroup>
            </div>


        
      </div>
    )
  }
}
