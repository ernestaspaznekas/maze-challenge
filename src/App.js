import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PrintData from './PrintData'
import Print from './components/Print'

class App extends Component {
  state = {
    'mazeId': false,
  }

  changeId = (mazeId) => {
    //console.log(mazeId)

    this.setState({'mazeId': mazeId})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Maze</h1>
        </header>
        <PrintData changeId={this.changeId} />
        <Print mazeId={this.state.mazeId} />
      </div>
    );
  }
}

export default App;
