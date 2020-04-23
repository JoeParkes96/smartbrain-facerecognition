import './UserRank.css'

import React from 'react';

const UserRank = () => {
    return (
        <div className="user-rank-section">
            <p className="descriptive-text">
                {'Joe, your user rank is'}
            </p>
            <p className="rank-number">
                {'#5'}
            </p>
        </div>
    );
}

export default UserRank;