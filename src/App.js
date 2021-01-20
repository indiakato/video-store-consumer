import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import Videos from './components/Videos';
import Customers from './components/Customers'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Link to='/videos'>Videos</Link>
          <Route path='/videos' component={() => <Videos url='http://localhost:3000' />}/>
        </Router>
        <Router>
          <Link to='/customers'>Customers</Link>
          <Route path='/customers' component={() => <Customers url='http://localhost:3000' />}/>
        </Router>
      </div>
    );
  }
}

export default App;
