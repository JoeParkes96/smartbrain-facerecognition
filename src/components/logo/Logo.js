import './Logo.css';

import React from 'react';
import logo from './logo_transparent.png';

const Logo = () => {
    return (
        <div className="logo-container">
            <img src={logo} alt="logo" className="logo-image"/>
        </div>
        
    )
}

export default Logo;