// require('normalize.css/normalize.css');
// require('styles/App.css');
require('../styles/board.css')

import React from 'react';
import Mine from './Mine.js'


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [], // 根据等级初始化棋盘
      isOver: false // 是否结束
      // board: new Array(this.props.level * 10).fill(
      //   new Array(this.props.level * 10).fill(null)
      // ) // 根据等级初始化棋盘
    }
  }

  componentDidMount() {
    document.oncontextmenu = function (e) {/*屏蔽浏览器默认右键事件*/
      e = e || window.event;
      return false;
    };
    this.initMine()
  }

  componentDidUpdate() {
  }

  initMine() {
    this.createMine()
  }

  // 生成雷区
  createMine() {
    // 根据等级随机生成雷区位置
    const minePosition = []
    for (let i = 0; i < this.props.level * 10; i++) {
      minePosition.push([this.createRandom(), this.createRandom()])
    }
    // 根据雷的位置布置在雷区中
    const currBoard = []
    for (let i = 0; i < this.props.level * 10; i ++) {
      currBoard.push(new Array(this.props.level * 10).fill(null))
    }
    currBoard.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        currBoard[rowIndex][colIndex] = {
          number: 0,
          isMask: true,
          isFlag: false, // 小红旗
          position: {
            x: rowIndex,
            y: colIndex
          }
        }
      })
    })
    minePosition.forEach(positionItem => {
      currBoard[positionItem[0]][positionItem[1]].number = -1
    })
    this.setState({ board: currBoard })
    this.createNumber(currBoard)
  }

  // 填充数字
  createNumber(currBoard) {
    const currentBoard = currBoard
    for (let i = 0; i < currentBoard.length; i ++) {
      for (let j = 0; j < currentBoard[i].length; j ++) {
        if (currentBoard[i][j].number !== -1) {
          let count = 0
          // 判断当前格子的周围八个格子是否是雷
          if (i - 1 >= 0 && j - 1 >= 0 && currentBoard[i - 1][j - 1].number === -1) {
            count ++
          }
          if (i - 1 >= 0 && currentBoard[i - 1][j].number === -1) {
            count ++
          }
          if (i - 1 >= 0 && j + 1 < this.props.level * 10 && currentBoard[i - 1][j + 1].number === -1) {
            count ++
          }
          if (j - 1 >= 0 && currentBoard[i][j - 1].number === -1) {
            count ++
          }
          if (j + 1 < this.props.level * 10 && currentBoard[i][j + 1].number === -1) {
            count ++
          }
          if (j - 1 >= 0 && i + 1 < this.props.level * 10 && currentBoard[i + 1][j - 1].number === -1) {
            count ++
          }
          if (i + 1 < this.props.level * 10 && currentBoard[i + 1][j].number === -1) {
            count ++
          }
          if (i + 1 < this.props.level * 10 && j + 1 < this.props.level * 10 && currentBoard[i + 1][j + 1].number === -1) {
            count ++
          }
          currentBoard[i][j].number = count
        }
      }
    }
    this.setState({board: currentBoard})
  }

  createRandom() {
    return Math.floor(Math.random() * 10 * this.props.level)
  }

  clickGrid(grid) {
    if (this.state.isOver) {
      return
    }
    const x = grid.position.x
    const y = grid.position.y
    if (this.state.board[x][y].number === -1) { // 点到雷的时候
      const newBoard = this.state.board
      newBoard[x][y].isMask = false
      newBoard[x][y].isFlag = false
      this.setState({board: newBoard})
      this.setState({isOver: true})
      this.showAllMine(this.state.board)
      this.clearAllFlag() // 如果踩雷则清除所有小旗
      window.alert('踩雷了')
      return
    }
    if (grid.number !== 0 && grid.number !== -1) { // 点到数组且不为零的时候
      const newBoard = this.state.board
      newBoard[x][y].isMask = false
      newBoard[x][y].isFlag = false
      this.setState({board: newBoard})
    }
    if (grid.number === 0) { // 点到零的时候
      this.clearZero(x, y)
    }
  }

  clearAllFlag() {
    const currBorad = this.state.board
    for (let i = 0; i < currBorad.length; i++) {
      for (let j = 0; j < currBorad[i].length; j++) {
        currBorad[x][y].isFlag = false
      }
    }
    this.setState({ board: currBorad })
  }

  // 右键标记小旗
  handleOnMouseDown(grid) {
    const flagNum = this.getFlagNumber()
    if (flagNum >= this.props.level * 10) { // 如果小旗的数量等于所有的雷数则不能插小旗了
      return
    }
    const CurrBoard = this.state.board
    const x = grid.position.x
    const y = grid.position.y
    CurrBoard[x][y].isFlag = !(grid.isFlag)
    this.setState({ board: CurrBoard })
    this.judegIsOver() // 判断时候成功
  }

  getFlagNumber() {
    const CurrBoard = this.state.board
    let flagNum = 0
    CurrBoard.forEach(row => {
      row.forEach(col => {
        if (col.isFlag) {
          flagNum++
        }
      })
    })
    return flagNum
  }

  showAllMine(board) {
    let currBoard = board.slice()
    currBoard = currBoard.forEach(row => {
      row.forEach(col => {
        col.isMask = false
      })
    })
    // this.setState({board: currBoard})
  }

  // 清零
  clearZero(x, y) { // 清零方法
    const newBoard = this.state.board
    newBoard[x][y].isMask = false
    function lighten(x, y) { // 以点击区域为中心向外点亮
      if (newBoard[x][y].number !== 0) {// 如果指定中心不为零，则只点亮中心
        newBoard[x][y].isMask = false
        newBoard[x][y].isFlag = false
        return
      } else { // 如果指定中心为零，则自动中心向外点亮
        for (let i = 0; i < newBoard.length; i++) {
          for (let j = 0; j < newBoard[i].length; j++) {
            if (i >= x - 1 && i <= x + 1 && j >= y - 1 && j <= y + 1 && newBoard[i][j].isMask === true) {
              newBoard[i][j].isMask = false
              newBoard[x][y].isFlag = false
              lighten(i, j)
            }
          }
        }
      }
    }
    lighten(x, y)
    this.setState({board: newBoard})
  }

  judegIsOver() { // 判断游戏是否结束
    const currentBoard = this.state.board
    const mineAll = this.props.level * 10 // 雷总数量
    let result = 0 // 当前标记小旗正确数量
    for (let i = 0; i < currentBoard.length; i++) {
      for (let j = 0; j < currentBoard[i].length; j++) {
        const currGrid = currentBoard[i][j]
        if (currGrid.isFlag && currGrid.number === -1) {
          result ++
        }
      }
    }
    if (mineAll === result) {
      this.setState({ isOver: true })
      window.alert('游戏成功')
    }
  }

  render() {
    return (
      <div className="board-box">
        { this.state.board.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            return <Mine key={colIndex.toString() + rowIndex.toString()} gridData={col} handleClickGrid={this.clickGrid.bind(this)} handleOnMouseDown={this.handleOnMouseDown.bind(this)}></Mine>
          })
        }) }
      </div>
    );
  }
}

Board.defaultProps = {
};

export default Board;
