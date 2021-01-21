import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import Videos from './components/Videos';
import Customers from './components/Customers'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000';

const App = () => {

  const [selectedVideo, setSelectedVideo] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [videos, setVideos] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  const showVideo = (videoTitle) => {
    setSelectedVideo(videoTitle)
  }

  const showCustomer = (customerName) => {
    setSelectedCustomer(customerName)
  }

  useEffect(() => {
    axios.get(BASE_URL + '/videos')
    .then((response) => {
      const apiVideos = response.data.map((apiVideo) => {
        return ({
          id: apiVideo.id,
          title: apiVideo.title,
          overview: apiVideo.overview,
          releaseDate: apiVideo.release_date,
          imageUrl: apiVideo.image_url,
          externalID: apiVideo.externalID
        })
      })
      setVideos(apiVideos)
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })
  }, [])


  useEffect(() => {
    axios.get(BASE_URL + '/customers')
    .then((response) => {
    const apiCustomers = response.data.map((apiCustomer) => {
        return ({
        id: apiCustomer.id,
        name: apiCustomer.name,
        registeredAt: apiCustomer.registered_at,
        address: apiCustomer.address,
        city: apiCustomer.city, 
        state: apiCustomer.state,
        postalCode: apiCustomer.postal_code,
        phone: apiCustomer.phone,
        accountCredit: apiCustomer.account_credit,
        videosCheckedOutCount: apiCustomer.videos_checked_out_count
        })
    })
    setCustomers(apiCustomers)
    })
    .catch((error) => {
        setErrorMessage(error.message)
    })
}, [])
  
  return (
    <div>
      {errorMessage ? <div><h2>{errorMessage}</h2></div> : ''}
      <Router>
      <Link to='/'>Home</Link>
      <Link to='/customers'>Customers</Link>
      <Link to='/library'>Videos</Link>
      {selectedCustomer && selectedVideo ? <Link to='/checkout'>Checkout</Link> : ''}
      <Route path='/' render={() => selectedVideo} />
      <Route path='/' render={() => selectedCustomer} />
      <Route path='/customers' component={() => <Customers customers={customers} onClickCallback={showCustomer} />}/>
      <Route path='/library' component={() => <Videos videos={videos} onClickCallback={showVideo}/>}/>
    </Router>
    
    </div>
  );
}

export default App;
