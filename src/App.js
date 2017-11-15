import React, { Component } from 'react';
import './App.css';
import AppBar from './components/AppBar'
import Paper from './components/Paper'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Paper />
      </div>
    );
  }
}

export default App;
