// require('normalize.css/normalize.css');
// require('styles/App.css');

import React from 'react';
import Board from './board'

// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 3,
      levelList: [1, 2, 3]
    }
  }

  handleLevelBtn(level) {
    this.setState({ level: level })
  }

  render() {
    return (
      <div className="container">
        <div className="level-list">
          { this.state.levelList.map(item => {
            return <div className="btn-item" key={item} onClick={ this.handleLevelBtn.bind(this, item) }>{ item + '级' }</div>
          }) }
        </div>
        <Board level={this.state.level}></Board>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
