import _ from 'lodash'
import React, { Component } from 'react'
import Cell from '../../components/cell'

import './index.scss'

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lost: false,
      won: false
    }

    this.checkFirstColumn = this.checkFirstColumn.bind(this)
    this.checkFirstRow = this.checkFirstRow.bind(this)
    this.checkLastRow = this.checkLastRow.bind(this)
    this.checkLastColumn = this.checkLastColumn.bind(this)
  }

  /**
  * Create an array for the board.
  *
  * Creates each cell on the board with data on if it's
  * been cleared and if it is a mine.
  */
  generateBoard() {
    const { options } = this.props
    this.cells = []

    for (let i = 0; i < options.height * options.width; i++) {
      this.cells.push({ key: i, cleared: false, mine: false })
    }

    // add mines to the board
    this.addMines()

    return this.cells;
  }

  /**
   * Add the number of mines to the board expected.
   *
   * Randomly generates locations for the mines.
   * Then adds the mines to the board.
   */
  addMines() {
    const { options } = this.props
    var mineLocations = []

    while (mineLocations.length < options.mines) {
      let randomLocation = _.random(this.cells.length - 1)
      if (mineLocations.indexOf(randomLocation) === -1) {
        mineLocations.push(randomLocation)
      }
    }

    // add the mines to the board
    for (var i = 0; i < mineLocations.length; i++) {
      this.cells[mineLocations[i]].mine = true
    }
  }

  /**
   * Checks if the point is in the first column
   *
   * @param i index of the cell being considered.
   * @returns a boolean indicating if the point is in the first colmun.
   */
  checkFirstColumn(i) {
    const { options } = this.props

    return i % options.width == 0
  }

  /**
   * Checks if the point is in the first row
   *
   * @param i index of the cell being considered.
   * @returns a boolean indicating if the point is in the first row.
   */
  checkFirstRow(i) {
    const { options } = this.props

    return i < options.width
  }

  /**
   * Checks if the point is in the last row
   *
   * @param i index of the cell being considered.
   * @returns a boolean indicating if the point is in the last row.
   */
  checkLastRow(i) {
    const { options } = this.props

    return i > options.width * options.height - (options.width + 1)
  }

  /**
   * Checks if the point is in the last column
   *
   * @param i index of the cell being considered.
   * @returns a boolean indicating if the point is in the last colmun.
   */
  checkLastColumn(i) {
    const { options } = this.props

    return (i + 1) % options.width == 0
  }

  /**
   * Clears the entire board.
   */
  clearBoard() {
    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i].cleared = true
    }
  }

  // @TODO: combine handleLoss and handleWon into one function

  /**
   * Sets game state to lost
   *
   */
  handleLoss() {
    if (!this.state.lost && !this.state.won){
      this.setState({lost: true});
    }
  }

  /**
   * Sets game state to won
   *
   */
  handleWin() {
    if (!this.state.won && !this.state.lost){
      this.setState({won: true});
    }
  }

  renderGrid() {
    const { options } = this.props
    const grid = this.generateBoard()
    const actions = {
      checkFirstColumn: this.checkFirstColumn,
      checkFirstRow: this.checkFirstRow,
      checkLastColumn: this.checkLastColumn,
      checkLastRow: this.checkLastRow
    }

    return (
      <figure className="board figure">
        <ul className="grid list">
          {grid.map(cell => (
            <Cell key={cell.key}
                  options={options}
                  cell={cell}
                  grid={grid}
                  actions={actions} />
          ))}
        </ul>
      </figure>
    )
  }

	render() {
    return (
      <section className="game section">
        {this.renderGrid()}
      </section>
    )
	}
}

export default Game
