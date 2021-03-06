import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import Videos from './components/Videos';
import Customers from './components/Customers'
import Videosearch from './components/Videosearch'
import axios from 'axios'
import moment from 'moment'
import videoImage from './IMG_1508.jpeg'

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

  const showCustomer = (customerID) => {
    setSelectedCustomer(customerID)
  }

  const checkOutVideoBtn = () => {
    return (
      <button onClick={checkout} className="btn btn-info">Check Out</button>
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

  const videoCustomerShow = () => {
    
    return(<div class="alert alert-primary" role="alert">
      <p>{selectedCustomer ? `Selected Customer ID: ${selectedCustomer}`  : ''}</p>
      <p>{selectedVideo ? `Selected Video Title: ${selectedVideo}`  : ''}</p>
      {selectedCustomer && selectedVideo ? checkOutVideoBtn() : ''}
    </div>)
  }

  

  
  return (
    <div>
      
      <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Full Stack Video Store</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"   aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to='/' className="nav-item nav-link">Home</Link>
            <Link to='/customers' className="nav-item nav-link">Customers</Link>
            <Link to='/library' className="nav-item nav-link">Videos</Link>
            <Link to='/search' className='nav-item nav-link'>Search</Link>
          </div>
        </div>
      </nav>

      {errorMessage ? <div><h2>{errorMessage}</h2></div> : ''}
      <Route path='/' render={selectedCustomer || selectedVideo ? videoCustomerShow : ''} />
      <Route path='/customers' component={() => <Customers customers={customers} onClickCallback={showCustomer} />}/>
      <Route path='/library' component={() => <Videos videos={videos} onClickCallback={showVideo}/>}/>
      <Route path='/search' component={() => <Videosearch videos={videos }/>}/>
      <Route exact path='/'/>
    </Router>
    <div className='App-header'>
        <h1 className='App-header-text'>Welcome to your Video Store</h1>
    </div>
      <img className='Video-image' src={videoImage} alt='video store' />
    </div>
    
  );
}

export default App;
