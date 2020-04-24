import './RecognitionImage.css';

import React from 'react';

const RecognitionImage = ( { imageURL }) => {
    return (
        <div className="center">
            <img src={imageURL} alt="" className="submitted-image"/>
        </div>
    );
}

export default RecognitionImage;