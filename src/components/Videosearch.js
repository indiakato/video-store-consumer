import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Result from './Result'
import PropTypes from 'prop-types';

const BASE_URL = 'http://localhost:3000';


const Videosearch = (props) => {
    const [searchTerm, setSearchTerm] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [errorMessage, setErrorMessage] = useState([]);

    const onInputChange = (event) => {
        const query = event.target.value
        setSearchTerm(query)
        getSearchResults(searchResults)
    }

    const searchVideo = searchResults.map((result) => {
        return (
            <Result title={result.title} overview={result.overview}
            releaseDate={result.release_date} addToLibrary={result.addToLibrary}
            key={result.id} />
        )
        
    })

    const getSearchResults = (query) => {
        
        axios.get(`${BASE_URL}/videos?query=<${searchTerm}`)
            .then((response) => {
                let searchedVideo = response.data;
                setSearchResults(searchedVideo)
                console.log(searchResults)
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
        
    }

    const addToLibrary = (externalID) => {
        const selectedVideo = searchResults.find((video) => {
            return video.externalID === externalID
        })

        selectedVideo['inventory'] = 10

        const checkIfInLibrary = props.videos.find((video) => {
            return video.externalID === externalID
        })

        if (checkIfInLibrary) {
            setErrorMessage('The video you are trying to add is already in the library')
        } else {
            axios.post(`${BASE_URL}/videos`, selectedVideo)
                .then((response) => {
                    const updatedVideoList = [...props.videos, response.data]
                    props.setVideos(updatedVideoList)
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                })
        }
    }   



    return (
        <div>
            <form className='new-search__form'>
                <input
                    type='text'
                    placeholder='Search'
                    onChange={onInputChange}
                />
            </form>
            {searchVideo}
        </div>
    )
}  

Videosearch.propTypes = {
    videos: PropTypes.array.isRequired
}

export default Videosearch;
