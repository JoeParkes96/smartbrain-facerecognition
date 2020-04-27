import './Navigation.css';

import React from 'react';

const Navigation = ( { onChangeRoute, isSignedIn }) => {
    if(isSignedIn) {
      return (
        <nav className="nav-bar">
            <button className="nav-button" onClick={() => onChangeRoute('signIn')}>Sign Out</button>  
        </nav>
      );
    } else {
        return (
            <nav className="nav-bar">
                <button className="nav-button" onClick={() => onChangeRoute('signIn')}>Sign In</button>
                <button className="nav-button" onClick={() => onChangeRoute('register')}>Register</button>
            </nav>
        );
    }   
}

export default Navigation;