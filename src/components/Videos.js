import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Video from './Video';

const Videos = ({url, onClickCallback}) => {
  const [videos, setVideos] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    axios.get(url + '/videos')
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
  }, [url])

  const loadBoard = () => {
    return videos.map((video) => {
      return <Video id={video.id} title={video.title} overview={video.overview} releaseDate={video.releaseDate} imageUrl={video.imageUrl} externalId={video.externalID} onClickCallback={onClickCallback} key={video.id}/>
    })
  }

  return(
    <div>
      {errorMessage ? <div><h2>{errorMessage}</h2></div> : ''}
      {loadBoard()}
    </div>
  )

}

Videos.propTypes = {
  url: PropTypes.string.isRequired
};

export default Videos;