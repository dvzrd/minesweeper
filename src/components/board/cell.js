import _ from 'lodash'
import React, { Component } from 'react'

class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cleared: props.cleared,
      mine: props.mine
    }
  }

  render() {
    console.log(this.state);
    
    return (
      <li className="cell item">
      </li>
    )
  }
}

export default Cell;
