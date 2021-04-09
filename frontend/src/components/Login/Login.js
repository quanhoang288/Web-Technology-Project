import React, { Component } from 'react';
import './Login.css'
import axios from 'axios'
import { HOST_URL } from '../../config'
import {Link} from 'react-router-dom'
class Login extends Component {
    state = {
        username: '',
        password: '',
    }
    fieldOnChangeHandler = (field, e) => {

        this.setState({ [`${field}`]: e.target.value })

    }
    onSubmit = (e) => {
        e.preventDefault()
        var data = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        });

        var config = {
            method: 'post',
            url: `${HOST_URL}/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }
    render() {
        return (
            <div className="container">
                <div className="wrapper-login">
                    <div className="title">
                        Login</div>
                    <form action="#">
                        <div className="field">
                            <input type="text" required />
                            <label>Email Address</label>
                        </div>
                        <div className="field">
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div className="content">
                            <div className="checkbox">
                                <input type="checkbox" id="remember-me" />
                                <label for="remember-me">Remember me</label>
                            </div>
                            <div className="pass-link">
                                <Link to="#">Forgot password?</Link></div>
                        </div>
                        <div className="field">
                            <input type="submit" value="Login" />
                        </div>
                        <div className="signup-link">
                            Not a member? <Link to='/register'>Sign up now!</Link></div>
                    </form>
                </div>
            </div>

        );
    }
}

export default Login;