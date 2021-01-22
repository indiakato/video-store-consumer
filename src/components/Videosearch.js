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
            release_date={result.release_date} onClickCallback={result.onClickCallback}
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


    return (
        <div>
            <form>
                <input
                    type='text'
                    placeholder='Search'
                    onChange={onInputChange}
                    onClickCallback={props.onClickCallback}
                />
            </form>
            {searchVideo}
        </div>
    )
}  

Videosearch.propTypes = {
    onClickCallback: PropTypes.func.isRequired
}

export default Videosearch;
