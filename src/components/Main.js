// require('normalize.css/normalize.css');
// require('styles/App.css');

import React from 'react';
import Board from './board'

// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: false, // 是否成功
      level: 1,
      levelList: [1, 2, 3]
    }
  }

  handleLevelBtn(level) {
    this.setState({ level: level, isSuccess: false })
  }

  handleSuccess() {
    this.setState({ isSuccess: true })
  }

  returnHint() {
    if (this.state.isSuccess) {
      return <div className="hine-text" style={{color: 'rgb(19, 206, 102)'}}>游戏成功！</div>
    }
  }

  render() {
    return (
      <div className="container">
        { this.returnHint() }
        <div className="level-list">
          { this.state.levelList.map(item => {
            return <div className="btn-item" key={item} onClick={ this.handleLevelBtn.bind(this, item) }>{ item + '级' }</div>
          }) }
        </div>
        <Board level={this.state.level} handleSuccess={ this.handleSuccess.bind(this) }></Board>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
