import React, {useState } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import Videos from './components/Videos';

const App = () => {

  const [selectedVideo, setSelectedVideo] = useState('');




  return (
    <Router>
      <Link to='/videos'>Videos</Link>
      <Route path='/videos' component={() => <Videos url='http://localhost:3000' />}/>
    </Router>
  );
}

export default App;
