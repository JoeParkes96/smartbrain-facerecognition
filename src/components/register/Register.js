import './Register.css';

import React from 'react';

const Register = ( {onChangeRoute} ) => {
    return (
        <div className="center">
            <div className="form-container">
                <fieldset>
                    <legend>Register</legend>
                    <div className="input-item">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" />    
                    </div>
                    <div className="input-item">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />    
                    </div>
                    <div className="input-item">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        <button className="register-button" type="submit" onClick={() => onChangeRoute('home')}>Register</button>
                    </div>
                </fieldset>
            </div>
        </div>
    );
}

export default Register;