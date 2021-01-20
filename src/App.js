import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import Videos from './components/Videos';
import Customers from './components/Customers';
import Homepage from './components/Homepage'

const App = () => {

  const [selectedVideo, setSelectedVideo] = useState('');

  const setVideo = (videoTitle) => {
    setSelectedVideo(videoTitle)
  }

  return (
    <Router>
      <Route path="/" component={() => <Homepage url='http://localhost:3000'/>}/>
      <Link to='./'>Home</Link>
      <Link to='/videos'>Videos</Link>
      <Route path='/videos' component={() => <Videos url='http://localhost:3000' onClickCallback={setVideo}/>}/>
      <Link to='/customers'>Customers</Link>
      <Route path='/customers' component={() => <Customers url='http://localhost:3000' />}/>
    </Router>
  );
}

export default App;
