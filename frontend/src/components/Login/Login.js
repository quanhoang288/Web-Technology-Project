import React, { Component } from "react";
import "./Login.css";
import PopUp from "../PopUp/PopUp";
import Backdrop from "../Backdrop/Backdrop";
import { HOST_URL } from "../../config";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN_ERROR, LOGIN_SUCCESS } from "../../store/actions/types";
class Login extends Component {
  state = {
    username: "",
    password: "",
    status: null,
  };
  fieldOnChangeHandler = (field, e) => {
    this.setState({ [`${field}`]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
    };
    fetch(`${HOST_URL}/users/login`, requestOptions)
      .then((response) => {
        var newStatus = { ...this.state.status };
        newStatus.code = response.status;
        this.setState({ status: newStatus });
        return response.json();
      })
      .then((result) => {
        var newStatus = { ...this.state.status };
        if (this.state.status.code !== 200) {
          newStatus.msg = result;
          this.setState({ status: newStatus });
          this.props.login_fail();
        } else {
          this.props.login_success(result);
        }
      })
      .catch((error) => console.log("error", error));
  };
  render() {
    if (this.props.token === null) {
      return (
        <div className="container">
          <div className="wrapper-login">
            <div className="title">Login</div>
            <form action="#">
              <div className="field">
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    this.fieldOnChangeHandler("username", e);
                  }}
                />
                <label>Username</label>
              </div>
              <div className="field">
                <input
                  type="password"
                  required
                  onChange={(e) => {
                    this.fieldOnChangeHandler("password", e);
                  }}
                />
                <label>Password</label>
              </div>
              <div className="content">
                <div className="checkbox">
                  <input type="checkbox" id="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <div className="pass-link">
                  <Link to="#">Forgot password?</Link>
                </div>
              </div>
              <div className="field">
                <input type="submit" value="Login" onClick={this.onSubmit} />
              </div>
              <div className="signup-link">
                Not a member? <Link to="/register">Sign up now!</Link>
              </div>
            </form>
          </div>
          {this.state.status ? (
            <React.Fragment>
              <PopUp
                show={this.state.status ? true : false}
                closeHandler={() => this.setState({ status: null })}
                msg={this.state.status}
              ></PopUp>
              <Backdrop
                toggleBackdrop={() => this.setState({ status: null })}
              ></Backdrop>
            </React.Fragment>
          ) : null}
        </div>
      );
    }
    return <Redirect to="/"></Redirect>;
  }
}

const mapState = (state) => {
  return {
    token: state.authReducer.token,
  };
};
const mapDispatch = (dispatch) => {
  return {
    login_success: (data) => dispatch({ type: LOGIN_SUCCESS, payload: data }),
    login_fail: (err) => dispatch({ type: LOGIN_ERROR, payload: err }),
  };
};
export default connect(mapState, mapDispatch)(Login);
