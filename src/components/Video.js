import React from 'react';
import PropTypes from 'prop-types';
import './Video.css'

const Video = ({id, title, overview, releaseDate, imageUrl, externalId, onClickCallback}) => {

  const onButtonClick = () => {
    onClickCallback(title);
  } 

  return(
      <div className=""> 
        <div className="card col-9">
          <img className="card-img-top" src={imageUrl} alt={`${title} book cover`}></img>
          <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title">{title}</h5>
            <button onClick={onButtonClick} className="btn btn-info">Select Title</button>
            </div>
            <p className="card-text">Published: {releaseDate}</p>
            <p className="card-text">{overview}</p>
          </div>
        
        
        
        
      </div>
    </div>

  )

}


Video.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  externalID: PropTypes.number,
  onClickCallback: PropTypes.func.isRequired
};

export default Video;