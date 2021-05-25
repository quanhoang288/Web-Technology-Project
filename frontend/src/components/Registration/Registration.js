import React, { Component } from "react";
import "./Registration.css";
import axios from "axios";
import { HOST_URL } from "../../config";
import { Redirect } from "react-router";
import Backdrop from "../Backdrop/Backdrop";
import PopUp from "../PopUp/PopUp";
class Registration extends Component {
  state = {
    user_info: {
      username: "",
      password: "",
      name: "",

      role: "student",
      school: "",
      phone: "",
    },
    success: false,
    response_status: null,
  };
  fieldOnChangeHandler = (field, e) => {
    const user = { ...this.state.user_info };
    user[`${field}`] = e.target.value;
    this.setState({ user_info: user });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password, name, role, school, phone } =
      this.state.user_info;
    var data = JSON.stringify({
      username: username,
      password: password,
      name: name,

      school: school,
      phone: phone,
      role: role,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };

    fetch(`${HOST_URL}/users`, requestOptions)
      .then((response) => 
      {
        this.setState({ response_status: response.status });
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    
  };
  render() {
    const genCustomInput = (key, description, type, field, required) => {
      return (
        <div className="field" key={key}>
          <input
            type={type}
            required={required}
            onChange={(e) => {
              this.fieldOnChangeHandler(field, e);
            }}
          ></input>
          <label>{description}</label>
        </div>
      );
    };
    const field = [
      {
        description: "Username",
        type: "text",
        field: "username",
        required: true,
      },
      {
        description: "Password",
        type: "password",
        field: "password",
        required: true,
      },
      {
        description: "Name",
        type: "text",
        field: "name",
        required: true,
      },

      {
        description: "Workplace",
        type: "text",
        field: "school",
        required: true,
      },
      {
        description: "Phone number",
        type: "number",
        field: "phone",
        required: true,
      },
    ];

    return (
      <React.Fragment>
        {!this.state.success ? (
          <div className="container">
            {this.state.response_status ? (
              <React.Fragment>
                <PopUp
                  show={this.state.response_status ? true : false}
                  closeHandler={() => this.setState({ response_status: null })}
                  msg={this.state.response_status}
                  redirect={() => {
                    window.location.href = "/login";
                  }}
                ></PopUp>
                <Backdrop
                  toggleBackdrop={() =>
                    this.setState({ response_status: null })
                  }
                ></Backdrop>
              </React.Fragment>
            ) : null}

            <div className="wrapper-register">
              <div className="title">Sign up!</div>
              <form onSubmit={this.onSubmit}>
                {field.map((elm, idx) => {
                  if (elm.type === "tel") {
                    return (
                      <div className="field" key={idx}>
                        <input
                          type={elm.type}
                          required={elm.required}
                          onChange={(e) => {
                            this.fieldOnChangeHandler(elm.field, e);
                          }}
                        ></input>
                        <label>{elm.description}</label>
                      </div>
                    );
                  }
                  return genCustomInput(
                    idx,
                    elm.description,
                    elm.type,
                    elm.field,
                    elm.required
                  );
                })}

                <div className="field">
                  <input type="submit" value="Register" />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <Redirect to="/login"></Redirect>
        )}
      </React.Fragment>
    );
  }
}

export default Registration;
