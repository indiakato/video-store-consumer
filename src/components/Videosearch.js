import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Result from './Result'

const BASE_URL = 'http://localhost:3000';


const Videosearch = () => {
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
            release_date={result.release_date}
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
                />
            </form>
            {searchVideo}
        </div>
    )
}  

export default Videosearch;
