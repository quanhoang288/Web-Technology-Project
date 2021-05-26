import React, { Component } from "react";

import { HOST_URL } from "../../config";
import Backdrop from "../Backdrop/Backdrop";
import PopUp from "../PopUp/PopUp";
class PasswordChange extends Component {
  state = {
    user_info: {
      old_password:"",
      new_password:"",
      confirm_password:"",
    },
    errors:"",
    
    status : null,
  };
  fieldOnChangeHandler = (field, e) => {
    const user = { ...this.state.user_info };
    user[`${field}`] = e.target.value;
    this.setState({ user_info: user });
  };
  validate(){
    let input = this.state.user_info;
    let errors = {};
    let isValid = true;
    if (typeof input["new_password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
        
      if (input["new_password"] != input["confirm_password"]) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
    } 

    this.setState({
      errors: errors
    });

    return isValid;
}

  onSubmit = (e) => {
    e.preventDefault();
    
    var data = JSON.stringify(this.state.user_info);
    if(!this.validate())
    {
        this.setState({status:{code:400, msg:"Password not match"}})
        return
    }
    this.setState({status:{code:200, msg:"Changed password"}})
    


    
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
        description: "Old password",
        type: "password",
        field: "old_password",
        required: true,
      },
      {
        description: "New password",
        type: "password",
        field: "new_password",
        required: true,
      },
      {
        description: "Comfirm password",
        type: "password",
        field: "confirm_password",
        required: true,
      },

    
    ];

    return (
      <React.Fragment>
          {
              this.state.status ? <React.Fragment>
              <PopUp
                show={this.state.status ? true : false}
                closeHandler={() => this.setState({ status: null })}
                msg={this.state.status}
                redirect={() => {
                  this.props.history.goBack()
                }}
              ></PopUp>
              <Backdrop
                toggleBackdrop={() => this.setState({ status: null })}
              ></Backdrop>
            </React.Fragment>:null
          }
          
          <div className="container">
            {this.state.status ? (
              <React.Fragment>
                <PopUp
                  show={this.state.status ? true : false}
                  closeHandler={() => this.setState({ status: null })}
                  msg={this.state.status}
                  redirect={() => {
                   this.props.history.goBack();
                  }}
                ></PopUp>
                <Backdrop
                  toggleBackdrop={() =>
                    {
                        this.setState({ status: null })
                        
                    }
                    
                  }
                ></Backdrop>
              </React.Fragment>
            ) : null}

            <div className="wrapper-register">
              <div className="title">Password</div>
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
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        
      </React.Fragment>
    );
  }
}

export default PasswordChange;
