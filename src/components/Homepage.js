import React, { useState } from 'react';

const Homepage = () => {
    const [selectedVideo, setSelectedVideo] = useState('');

    const setVideo = (videoTitle) => {
        setSelectedVideo(videoTitle)
    }

    return (
        <div>
            <p>{selectedVideo}</p>
            <p>Home</p>
        </div>
        );
}

export default Homepage;