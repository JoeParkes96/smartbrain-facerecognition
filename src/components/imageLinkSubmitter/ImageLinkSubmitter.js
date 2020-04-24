import './ImageLinkSubmitter.css';

import React from 'react';

const ImageLinkSubmitter = ({ onInputChange, onSubmit }) => {
    return (
        <div className="image-link-submitter">
            <p className="descriptive-text">
                {'Provide an image URL and I will detect the face'}
            </p>
            <div className="input-section center">
                <div className="form-wrapper center">
                    <input type="text" className="image-link-input center" onChange={onInputChange}></input>
                    <button className="image-submit-button center" onClick={onSubmit}>Submit</button>
                </div>
            </div>
            
        </div>
    )
}

export default ImageLinkSubmitter;