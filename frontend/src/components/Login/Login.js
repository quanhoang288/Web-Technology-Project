import React, { Component } from 'react';
import './Login.css'
import axios from 'axios'
import { HOST_URL } from '../../config'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {LOGIN_ERROR, LOGIN_SUCCESS} from '../../store/actions/types'
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

        // var config = {
        //     method: 'post',
        //     url: `${HOST_URL}/login`,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: data
        // };

        // axios(config)
            // .then(res => {
            //     if(res.data['response']['token'])
            //     {
            //         this.props.login_success(res.data['response']);
            //     }
            //     else
            //     {
                    
            //         this.props.login_fail();
            //     }
            // })
            // .catch(err => {
                
            //     this.props.login_fail()
            // })



        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: data,
          
        };
        
        fetch(`${HOST_URL}/login`, requestOptions)
          .then(response => response.json())
          .then(res => {
            if(res['response']['token'])
            {
                this.props.login_success(res['response']);
            }
            else
            {
                this.props.login_fail();
            }
          })
          .catch(error => console.log('error', error));


    }
    render() {
        if (this.props.token === null)
        {
            return (
                <div className="container">
                    <div className="wrapper-login">
                        <div className="title">
                            Login</div>
                        <form action="#">
                            <div className="field">
                                <input type="text" required  onChange={(e) => {this.fieldOnChangeHandler('username',e)}}/>
                                <label>Username</label>
                            </div>
                            <div className="field">
                                <input type="password" required  onChange={(e) => {this.fieldOnChangeHandler('password',e)}}/>
                                <label>Password</label>
                            </div>
                            <div className="content">
                                <div className="checkbox">
                                    <input type="checkbox" id="remember-me" />
                                    <label htmlFor="remember-me">Remember me</label>
                                </div>
                                <div className="pass-link">
                                    <Link to="#">Forgot password?</Link></div>
                            </div>
                            <div className="field">
                                <input type="submit" value="Login" onClick={this.onSubmit} />
                            </div>
                            <div className="signup-link">
                                Not a member? <Link to='/register'>Sign up now!</Link></div>
                        </form>
                    </div>
                </div>
    
            );
        }
        return <Redirect to ='/'></Redirect>
        
    }
}

const mapState = (state) => {
    return (
        {
            token: state.authReducer.token
        }
    )
}
const mapDispatch = (dispatch) => {
    return (
        {
            login_success: (data) => dispatch({ type: LOGIN_SUCCESS, payload: data }),
            login_fail: err => dispatch({ type: LOGIN_ERROR, payload: err })
        }
    )
}
export default connect(mapState, mapDispatch)(Login)
