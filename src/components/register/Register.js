import './Register.css';

import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    onRegister = () => {
        if(this.checkInputIsValid()) {
            fetch('http://localhost:3000/register',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onChangeRoute('home');
                }
            })
            .catch(err => console.log(err));
        } else {
            throw Error('Invalid input');
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div className="center">
                <div className="form-container">
                    <fieldset>
                        <legend>Register</legend>
                        <div className="input-item">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={this.onNameChange} />    
                        </div>
                        <div className="input-item">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={this.onEmailChange} />    
                        </div>
                        <div className="input-item">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={this.onPasswordChange} />
                        </div>
                        <div>
                            <button className="register-button" type="submit" onClick={this.onRegister}>Register</button>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }

    checkInputIsValid = () => {
        return this.state.name  !== '' && this.state.email !== '' && this.state.password !== '';
    }
}

export default Register;