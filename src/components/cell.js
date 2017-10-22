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
    const { action } = this.props;

    return (
      <li className="cell item" onClick={action} />
    )
  }
}

export default Cell;
