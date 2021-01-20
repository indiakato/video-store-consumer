import React from 'react';
import PropTypes from 'prop-types';

const Video = ({id, title, overview, releaseDate, imageUrl, externalId}) => {

  return(
    <div>
      <p>{id} {title} {overview} {releaseDate} {imageUrl} {externalId}</p>
    </div>
  )

}


Video.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  externalID: PropTypes.number
};

export default Video;