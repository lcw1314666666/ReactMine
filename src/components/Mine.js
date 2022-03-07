// require('normalize.css/normalize.css');
// require('styles/App.css');

import React from 'react';

class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorList: ['red', '#FA8072', '#FF69B4', '#20B2AA', '#FFE4B5', '#87CEEB', '#9370DB', '#D2691E', '#FA8072']
    }
  }

  componentDidMount() {
  }

  clickGrid(value) {
    this.props.handleClickGrid(value)
  }

  showFlag(gridData) {
    if (gridData.isFlag) {
      return <img className="flag" src="../images/xiaohongqi.png" />
    }
  }

  showMine(gridData) {
    if (gridData.number === -1) {
      return <img className="flag" src="../images/mine.png" />
    }
  }

  onMouseDown(value) {
    this.props.handleOnMouseDown(value)
  }

  render() {
    return (
      <div className="mine" style={{color: this.state.colorList[this.props.gridData.number]}} onClick={this.clickGrid.bind(this, this.props.gridData)}>
        <div className={this.props.gridData.isMask ? 'mask' : ''} onContextMenu={this.onMouseDown.bind(this, this.props.gridData)}>
          { this.showFlag(this.props.gridData) }
        </div>
        { this.showMine(this.props.gridData) }
        { this.props.gridData.number > 0 ? this.props.gridData.number : '' }
      </div>
    );
  }
}

Mine.defaultProps = {
};

export default Mine;
