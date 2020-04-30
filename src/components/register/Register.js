import './Register.css';

import React, { Component } from 'react';

const validEmailRegex = 
    RegExp(/^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i);
    
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            validationErrors: {
                name : {
                    message: '',
                    display: false
                },
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

    onRegister = () => {
        if(this.validateForm(this.state.validationErrors)) {
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
            console.error('Invalid form');
        }
    }

    onNameChange = (event) => {
        if (this.validateInputChange(event))
            this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        if (this.validateInputChange(event))
            this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        if (this.validateInputChange(event))
            this.setState({password: event.target.value});
    }

    render() {
        const nameErrors = this.state.validationErrors.name;
        const emailErrors = this.state.validationErrors.email;
        const passwordErrors = this.state.validationErrors.password;

        return (
            <div className="center">
                <div className="form-container">
                    <fieldset>
                        <legend>Register</legend>
                        <div className="input-item">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={this.onNameChange} />
                            <span className={this.getInputStateClass(nameErrors.display)}>{nameErrors.message}</span>
                        </div>
                        <div className="input-item">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={this.onEmailChange} />
                            <span className={this.getInputStateClass(emailErrors.display)}>{emailErrors.message}</span>
                        </div>
                        <div className="input-item">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={this.onPasswordChange} />
                            <span className={this.getInputStateClass(passwordErrors.display)}>{passwordErrors.message}</span>
                        </div>
                        <div>
                            <button className="register-button" type="submit" onClick={this.onRegister}>Register</button>
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
            case 'name':
                const isNameValid =  value.length >= 2;
                errors.name.message = isNameValid ? '' : 'Name must be 2 or more characters';
                errors.name.display= isNameValid ? false : true;
                break;
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
        if (this.state.name  === '' && this.state.email === '' && this.state.password === '') {
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
}

export default Register;