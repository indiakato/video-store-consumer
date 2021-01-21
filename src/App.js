import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import Videos from './components/Videos';
import Customers from './components/Customers'
import Videosearch from './components/Videosearch'
import Result from './components/Result'
import axios from 'axios'
import moment from 'moment'

const BASE_URL = 'http://localhost:3000';

const App = () => {

  const [selectedVideo, setSelectedVideo] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [videos, setVideos] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);


  const getDueDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return (moment(date).format('MMM, D YYYY'))
  }

  const showVideo = (videoTitle) => {
    setSelectedVideo(videoTitle)
  }

  // todo: this shows the customer id and not name on every page now
  const showCustomer = ([customerID, customerName]) => {
    setSelectedCustomer(customerID)
  }

  const checkOutVideoBtn = () => {
    return (
      <button onClick={checkout} >Check Out</button>
    )
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

  const checkout = () => {
    axios.post(`${BASE_URL}/rentals/${selectedVideo}/check-out?customer_id=${selectedCustomer}&due_date=${getDueDate()}`)
    .then((response) => {
      console.log(response)
      setErrorMessage(`Movie titled ${selectedVideo} checked out to Customer ID: ${selectedCustomer}`)
    })
    .catch((error) =>{
      setErrorMessage(`Unable to checkout movie titled ${selectedVideo} to Customer ID: ${selectedCustomer}`);
    })

  }

  
  return (
    <div>
      {errorMessage ? <div><h2>{errorMessage}</h2></div> : ''}
      <Router>
      <Link to='/'>Home</Link>
      <Link to='/customers'>Customers</Link>
      <Link to='/library'>Videos</Link>
      <Link to='/search'>Search</Link>
      {selectedCustomer && selectedVideo ? checkOutVideoBtn() : ''}
      <Route path='/' render={() => selectedVideo} />
      <Route path='/' render={() => selectedCustomer} />
      <Route path='/customers' component={() => <Customers customers={customers} onClickCallback={showCustomer} />}/>
      <Route path='/' component={() => <Videosearch/>} />
      <Route path='/library' component={() => <Videos videos={videos} onClickCallback={showVideo}/>}/>
    </Router>
    </div>
  );
}

export default App;
