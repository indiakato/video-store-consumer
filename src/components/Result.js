import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

const Result = (props) => {

    return (
        <div>
            {props.title}
            <button onClick={onClickCallback} className="btn btn-info">Select</button>
        </div>
    )
}

Result.propTypes = {
    title: PropTypes.string,
    onClickCallback: PropTypes.func
}

export default Result