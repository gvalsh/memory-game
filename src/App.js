import React, {Component} from 'react';
import './App.css';
import Board from './components/Board/Board'

class App extends Component {
  render() {
    return  (
      <div className="app">
        <Board/>
      </div>
    );
  }
}

export default App;
