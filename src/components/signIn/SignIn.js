import './SignIn.css';

import React, { Component } from 'react';

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        };
    }
    
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmit = () => {
        fetch('http://localhost:3000/signin',
        {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onChangeRoute('home');
            }
        });
    }

    render() {
       const { onChangeRoute } = this.props;

        return (
            <div className="center">
                <div className="form-container">
                    <fieldset>
                        <legend>Sign In</legend>
                        <div className="input-item">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={this.onEmailChange} />    
                        </div>
                        <div className="input-item">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={this.onPasswordChange} />
                        </div>
                        <div>
                            <button className="sign-in-button" onClick={this.onSubmit}>Sign In</button>
                        </div>
                        <div>
                            <p className="register" onClick={() => onChangeRoute('register')}>Register</p>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default SignIn;