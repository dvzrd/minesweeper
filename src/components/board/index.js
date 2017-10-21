import _ from 'lodash'
import React, { Component } from 'react'
import Cell from './cell'

import './index.scss'

class Board extends Component {
  renderGrid() {
    const { grid } = this.props;

    return (
      <ul className="grid list">
        {grid.map(cell => (
          <Cell key={cell.key}
                cleared={cell.cleared}
                mine={cell.mine} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <figure className="board figure">
        { this.renderGrid() }
      </figure>
    )
  }
}

export default Board;
