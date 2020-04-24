import './RecognitionImage.css';

import React from 'react';

const RecognitionImage = ( { imageURL, box }) => {
    return (
        <div className="center">
            <div className="image-container">
                <img id="inputted-image" src={imageURL} alt="" className="submitted-image"/>
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>    
        </div>
            
    );
}

export default RecognitionImage;