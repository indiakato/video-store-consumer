import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import Videos from './components/Videos';
import Customers from './components/Customers'

const App = () => {

  const [selectedVideo, setSelectedVideo] = useState('');

  const setVideo = (videoTitle) => {
    setSelectedVideo(videoTitle)
  }
  
  return (
    <Router>
      <Link to='/'>Home</Link>
      <Link to='/customers'>Customers</Link>
      <Link to='/library'>Videos</Link>
      <Route path='/' render={() => selectedVideo} />
      <Route path='/customers' component={() => <Customers url='http://localhost:3000' />}/>
      <Route path='/library' component={() => <Videos url='http://localhost:3000' onClickCallback={setVideo}/>}/>
    </Router>
  );
}

export default App;
