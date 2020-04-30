import './SignIn.css';

import React, { Component } from 'react';

const validEmailRegex = 
  RegExp(/^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i);

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            credentialsErrors: {
                message: '',
                display: false
            },
            validationErrors: {
                email: {
                    message: '',
                    display: false
                },
                password: {
                    message: '',
                    display: false
                }
            }
        };
    }
    
    onEmailChange = (event) => {
        if (this.validateInputChange(event))
            this.setState({email: event.target.value});
            this.clearCredentialsErrorsState();
    }

    onPasswordChange = (event) => {
        if (this.validateInputChange(event))
            this.setState({password: event.target.value});
            this.clearCredentialsErrorsState();
    }

    onSubmit = () => {
        if (this.validateForm(this.state.validationErrors)) {
            fetch('http://localhost:3000/signin',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(responseJson => {
                this.handleSignInResponse(responseJson);
            })
            .catch(err => console.log(err));
        } else {
            console.error('Invalid form');
        }
    }

    handleSignInResponse = (responseJson) => {
        let errors = this.state.credentialsErrors;
        if (responseJson === 'Incorrect credentials') {
            errors = {
                message: 'Email or password are incorrect',
                display: true
            };
            this.setState({credentialsErrors: errors});
        } else if (responseJson.id) {
            this.clearCredentialsErrorsState();
            this.setState({credentialsErrors: errors});
            this.props.loadUser(responseJson);
            this.props.onChangeRoute('home');
        }
    }

    render() {
       const { onChangeRoute } = this.props;
       const emailErrors = this.state.validationErrors.email;
       const passwordErrors = this.state.validationErrors.password;
       const credentialsErrors = this.state.credentialsErrors;

        return (
            <div className="center">
                <div className="form-container">
                    <fieldset>
                        <legend>Sign In</legend>
                        <div className="input-item">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={this.onEmailChange} required/> 
                            <span className={this.getInputStateClass(emailErrors.display)}>{emailErrors.message}</span>    
                        </div>
                        <div className="input-item">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={this.onPasswordChange} required/> 
                            <span className={this.getInputStateClass(passwordErrors.display)}>{passwordErrors.message}</span>
                        </div>
                        <div className="submit-item">
                            <button className="sign-in-button" onClick={this.onSubmit}>Sign In</button>
                            <span className={this.getInputStateClass(credentialsErrors.display)}>{credentialsErrors.message}</span>
                        </div>
                        <div>
                            <p className="register" onClick={() => onChangeRoute('register')}>Register</p>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }

    validateInputChange = (event) => {
        const { name, value } = event.target;
        let errors = this.state.validationErrors;
        switch(name) {
            case 'email':
                const isEmailValid =  validEmailRegex.test(value);
                errors.email.message = isEmailValid ? '' : 'Email is not valid';
                errors.email.display= isEmailValid ? false : true;
                break;
            case 'password':
                const isPasswordValid = value.length >= 8;
                errors.password.message = isPasswordValid ? '' : 'Password must be 8 or more characters';
                errors.password.display = isPasswordValid ? false : true;
                break;
            default:
                throw Error('Invlaid input type');
        }

        this.setState({errors, [name]: value});
    }

    validateForm = (errors) => {
        let valid = true;
        if (this.state.email === '' || this.state.password === '') {
            valid = false;
        } else {
            Object.values(errors).forEach(error  => {
                if (error.message.length > 0)
                    valid = false;
            });
        }

        return valid;
    }

    getInputStateClass = (isError) => {
        return isError ? 'error' : 'hidden';
    }

    clearCredentialsErrorsState = () => {
        let credentialsErrors = this.state.credentialsErrors;
        credentialsErrors = {
            message: '',
            display: false
        };
        this.setState({credentialsErrors});
    }
}

export default SignIn;