import React from 'react'
import PropTypes from 'prop-types'

const Result = (props) => {

    return (
        <div>
            <p >{props.title}</p>
            {<button onClick={props.addToLibrary} className="btn btn-info">Add to Library</button>}
        </div>
    )
}

Result.propTypes = {
    title: PropTypes.string,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    addToLibrary: PropTypes.func
}

export default Result