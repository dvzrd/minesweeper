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
    // create an array for the board
    this.board = this.generateBoard()

    this.clearCell = this.clearCell.bind(this)
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
   * Clear cell on board. If the cell is a zero clear surrounding locations.
   *
   * @param i the index of the space to clear.
   */
  clearCell(i) {
    if (!this.cells[i].cleared) {
      this.cells[i].cleared = true;
      if (this.cells[i].mine) {
        this.setState({lost: true});
      }
      else {
        // recursively clear neighbors if there are no mines
        const mineCount = this.mineCount(i);
        if (mineCount === 0) {
          const neighbors = this.neighbors(i);
          for (let i = 0; i < neighbors.length; i++) {
            this.clearCell(neighbors[i]);
          }
        }
      }
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
   * Returns a list for all the points that are neighbors of the point.
   *
   * @param i the index of the point being considered.
   * @returns
   */
  neighbors(i) {
    const { options } = this.props
    var firstRow = this.checkFirstRow(i)
    var lastRow = this.checkLastRow(i)
    var firstColumn = this.checkFirstColumn(i)
    var lastColumn = this.checkLastColumn(i)

    // if neighbors are already determined return them.
    if (this.cells[i].neighborCells) {
      return this.cells[i].neighborCells
    }

    var neighborCells = []
    if (!firstRow && !firstColumn) {
      neighborCells.push(i - options.width - 1)
    }
    if (!firstRow) {
      neighborCells.push(i - options.width)
    }
    if (!firstRow && !lastColumn) {
      neighborCells.push(i - options.width + 1)
    }
    if (!firstColumn) {
      neighborCells.push(i - 1)
    }
    if (!lastColumn) {
      neighborCells.push(i + 1)
    }
    if (!lastRow && !firstColumn) {
      neighborCells.push(i + options.width - 1)
    }
    if (!lastRow) {
      neighborCells.push(i + options.width)
    }
    if (!lastRow && !lastColumn) {
      neighborCells.push(i + options.width + 1)
    }

    this.cells[i].neighborCells = neighborCells

    return this.cells[i].neighborCells
  }

  /**
   * Returns the count of mines that surround the point
   *
   * @param i the point to check
   * @returns the number of mines surrounding the point
   */
  mineCount(i) {
    var neighbors = this.neighbors(i)
    var numberMines = 0

    // if this is previously calculated return it
    if (this.cells[i].mineCount) {
      return this.cells[i].mineCount
    }

    // count mines in neighbor cells
    for (var j = 0; j < neighbors.length; j++) {
      if (this.cells[neighbors[j]].mine) {
        numberMines++
      }
    }

    this.cells[i].mineCount = numberMines
    return this.cells[i].mineCount
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
    const grid = this.board;

    return (
      <figure className="board figure">
        <ul className="grid list">
          {grid.map(cell => (
            <Cell key={cell.key}
                  cleared={cell.cleared}
                  mine={cell.mine}
                  action={this.clearCell} />
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
