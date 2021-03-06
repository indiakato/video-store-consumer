import React from 'react';
import PropTypes from 'prop-types'
import Video from './Video'

const Videos = ({videos, onClickCallback}) => {

  const loadBoard = () => {
    return videos.map((video) => {
      return <div className="col-md-6 col-lg-3 d-flex align-items-stretch "> <Video id={video.id} title={video.title} overview={video.overview} releaseDate={video.releaseDate} imageUrl={video.imageUrl} externalId={video.externalID} onClickCallback={onClickCallback} key={video.id}/></div>
    })
  }

  return(
    <div class="row m-5">
      {loadBoard()}
    </div>
  )

}

Videos.propTypes = {
  videos: PropTypes.array.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

export default Videos;