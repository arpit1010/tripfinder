import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import DrpContainerSrch from './components/DrpContainerSrch';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
      <DrpContainerSrch/>
      </div>
    );
  }
}

export default App;
