import React, { Component } from 'react';
import { Todo } from '../todo';
import { Header } from '../header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Todo />
      </div>
    );
  }
}

export default App;
