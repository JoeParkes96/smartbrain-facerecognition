import './UserRank.css'

import React from 'react';

const UserRank = ({name, submissions}) => {
    return (
        <div className="user-rank-section">
            <p className="descriptive-text">
                {`${name}, your submission count is`}
            </p>
            <p className="rank-number">
                {`${submissions}`}
            </p>
        </div>
    );
}

export default UserRank;