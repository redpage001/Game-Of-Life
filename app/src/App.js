import React, { Component } from 'react';

import './App.css';
import Canvas from "./components/Canvas"
import Rules from "./components/Rules"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Divider right">
          <h1>Conway's Game of Life</h1>
          <Canvas />
        </div>
        <div className="Divider left">
          <Rules />
        </div>
      </div>
    )
  }
}

export default App;