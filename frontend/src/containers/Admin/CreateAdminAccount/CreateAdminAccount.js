import React, { Component } from "react";
import Backdrop from "../../../components/Backdrop/Backdrop";
import PopUp from "../../../components/PopUp/PopUp";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { HOST_URL } from "../../../config";

class Registration extends Component {
  state = {
    user_info: {
      username: "",
      password: "",
      name: "",
      role: "admin",
      phone: "",
      school: "",
    },
    status: false,
  };
  fieldOnChangeHandler = (field, e) => {
    const user = { ...this.state.user_info };
    user[`${field}`] = e.target.value;
    this.setState({ user_info: user });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password, name, role } = this.state.user_info;
    var data = null;

    if (role == "admin") {
      data = JSON.stringify({
        username: username,
        password: password,
        name: name,
        role: role,
      });
    } 

    else {
      console.log("Ojashdkjasdhakjh")
      data = JSON.stringify({
        username: username,
        password: password,
        name: name,
        role: role,
        phone: this.state.user_info.phone,
        school: this.state.user_info.school,
      });
    }
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };

    fetch(`${HOST_URL}/users`, requestOptions)
      .then((response) => {
        
        
          var newStatus = {...this.state.status}
          newStatus.code = response.status
          this.setState({status:newStatus})
          return response.json()
        
      })
      .then((result) => {
        
        var newStatus = {...this.state.status}
        newStatus.msg = result
        this.setState({status:newStatus})
      })
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
    ];

    return (
      <React.Fragment>
        {this.state.status ? (
          <React.Fragment>
            <PopUp
              show={this.state.status ? true : false}
              closeHandler={() => this.setState({ status: null })}
              msg={this.state.status}
              redirect={() => {
                window.location.href = "/admin/manage/courses";
              }}
            ></PopUp>
            <Backdrop
              toggleBackdrop={() => this.setState({ status: null })}
            ></Backdrop>
          </React.Fragment>
        ) : null}
        <div className="container">
          <div className="wrapper-register">
            <div className="title">New accounts</div>
            <form onSubmit={this.onSubmit}>
              <Dropdown
                options={[{ role: "teacher" }, { role: "admin" }]}
                field="role"
                value={this.state.user_info.role}
                onChange={(option) => {
                  var newState = { ...this.state };

                  if (option) {
                    newState.user_info.role = option["role"];
                    newState.user_info.school = ''
                    newState.user_info.phone = ''
                  } else {
                    newState.user_info.role = null;
                  }
                  this.setState(newState);
                }}
              ></Dropdown>
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

              {this.state.user_info.role === "teacher" ? (
                <React.Fragment>
                  <div className="field">
                    <input
                      type="School"
                      required
                      onChange={(e) => {
                        this.fieldOnChangeHandler("school", e);
                      }}
                    ></input>
                    <label>School</label>
                  </div>
                  <div className="field">
                    <input
                      type="number"
                      required
                      onChange={(e) => {
                        this.fieldOnChangeHandler("phone", e);
                      }}
                    ></input>
                    <label>Phone</label>
                  </div>
                </React.Fragment>
              ) : null}

              <div className="field">
                <input type="submit" value="Register" />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Registration;
