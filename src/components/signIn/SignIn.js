import './SignIn.css';

import React from 'react';

const SignIn = ( {onChangeRoute} ) => {
    return (
        <div className="center">
            <div className="form-container">
                <fieldset>
                    <legend>Sign In</legend>
                    <div className="input-item">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />    
                    </div>
                    <div className="input-item">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        <button className="sign-in-button" onClick={() => onChangeRoute('home')}>Sign In</button>
                    </div>
                    <div>
                        <p className="register" onClick={() => onChangeRoute('register')}>Register</p>
                    </div>
                </fieldset>
            </div>
        </div>
    );
}

export default SignIn;