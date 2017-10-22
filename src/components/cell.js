import _ from 'lodash'
import React, { Component } from 'react'

class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cleared: props.cell.cleared,
      mine: props.cell.mine
    }

    this.clearCell = this.clearCell.bind(this)
  }

  // @TODO: move methods to game container
  // pass props current cell index

  /**
   * Clear cell on board. If the cell is a zero clear surrounding locations.
   *
   * @param i the index of the space to clear.
   */
  clearCell() {
    if (!this.state.cleared) {
      this.setState({cleared: true});

      console.log('cleared: ' + this.state.cleared, 'mine: ' + this.state.mine)
      if (this.state.mine) {
        console.log('lost game');
      }
      else {
        // recursively clear neighbors if there are no mines
        const mineCount = this.mineCount();
        if (mineCount === 0) {
          const neighbors = this.neighbors();
          for (let i = 0; i < neighbors.length; i++) {
            this.clearCell(neighbors[i]);
          }
        }
      }
    }
  }

  /**
   * Returns a list for all the points that are neighbors of the point.
   *
   * @param i the index of the point being considered.
   * @returns
   */
  neighbors() {
    const { options, cell, grid, actions } = this.props

    var firstRow = actions.checkFirstRow(cell.key)
    var lastRow = actions.checkLastRow(cell.key)
    var firstColumn = actions.checkFirstColumn(cell.key)
    var lastColumn = actions.checkLastColumn(cell.key)

    // if neighbors are already determined return them.
    if (grid[cell.key].neighborCells) {
      return grid[cell.key].neighborCells
    }

    var neighborCells = []
    if (!firstRow && !firstColumn) {
      neighborCells.push(cell.key - options.width - 1)
    }
    if (!firstRow) {
      neighborCells.push(cell.key - options.width)
    }
    if (!firstRow && !lastColumn) {
      neighborCells.push(cell.key - options.width + 1)
    }
    if (!firstColumn) {
      neighborCells.push(cell.key - 1)
    }
    if (!lastColumn) {
      neighborCells.push(cell.key + 1)
    }
    if (!lastRow && !firstColumn) {
      neighborCells.push(cell.key + options.width - 1)
    }
    if (!lastRow) {
      neighborCells.push(cell.key + options.width)
    }
    if (!lastRow && !lastColumn) {
      neighborCells.push(cell.key + options.width + 1)
    }

    grid[cell.key].neighborCells = neighborCells

    return grid[cell.key].neighborCells
  }

  /**
   * Returns the count of mines that surround the point
   *
   * @param i the point to check
   * @returns the number of mines surrounding the point
   */
  mineCount() {
    const { cell, grid } = this.props;

    var neighbors = this.neighbors()
    var numberMines = 0

    // if this is previously calculated return it
    if (grid[cell.key].mineCount) {
      return grid[cell.key].mineCount
    }

    // count mines in neighbor cells
    for (var j = 0; j < neighbors.length; j++) {
      if (grid[neighbors[j]].mine) {
        numberMines++
      }
    }

    grid[cell.key].mineCount = numberMines
    return grid[cell.key].mineCount
  }

  render() {
    return (
      <li className="cell item" onClick={this.clearCell} />
    )
  }
}

export default Cell;
