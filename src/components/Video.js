import React from 'react';
import PropTypes from 'prop-types';

const Video = ({id, title, overview, releaseDate, imageUrl, externalId, onClickCallback}) => {

  const onButtonClick = () => {
    onClickCallback(id);
  } 

  return(
    <div>
      <button onClick={onButtonClick}>{title}</button>
      {/* should include an image tag */}
      <p>{id} {overview} {releaseDate} {imageUrl} {externalId}</p>
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