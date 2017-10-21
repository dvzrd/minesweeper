import _ from 'lodash'
import React, { Component } from 'react'
import Board from '../../components/board'

import './index.scss'

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lost: false
    }
  }

  generateBoard() {
    const { options } = this.props
    var cells = []
    var mineLocations = []

    for (let i = 0; i < options.height * options.width; i++) {
      cells.push({ key: i, cleared: false, mine: false })
    }

    // @TODO: move to addMines()
    while (mineLocations.length < options.mines) {
      let randomLocation = _.random(cells.length - 1)
      if (mineLocations.indexOf(randomLocation) === -1) {
        mineLocations.push(randomLocation)
      }
    }

    // add the mines to the board
    for (var i = 0; i < mineLocations.length; i++) {
      cells[mineLocations[i]].mine = true
    }

    return cells;
  }

	render() {
    const { options } = this.props
    const grid = this.generateBoard()

    return (
      <section className="game section">
        <Board grid={grid} />
      </section>
    )
	}
}

export default Game
