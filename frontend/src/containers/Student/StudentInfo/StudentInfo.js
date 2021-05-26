import React, { Component } from "react";
import "./StudentInfo.css";
import InputField from "../../../components/InputField/InputField";
import { connect } from "react-redux";
import { HOST_URL } from "../../../config";
import { Link } from "react-router-dom";
export class StudentInfo extends Component {
  state = {
    editing: false,
    info: null,
    edit_info: null,
  };
  fetch_data = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${HOST_URL}/users/${this.props.user.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({ info: result["user"] }))
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetch_data();
  }
  handleEdit = (field, value) => {
    var editState = JSON.parse(JSON.stringify(this.state));
    var edit_info = editState.edit_info;
    edit_info[field] = value;
    this.setState(editState);
  };
  onSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(this.state.edit_info);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${HOST_URL}/users/${this.props.user.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        this.fetch_data();
        this.setState({ editing: false });
      })
      .catch((error) => console.log("error", error));
  };
  render() {
    return (
      <div class="user-info">
        {this.state.info ? (
          <React.Fragment>
            <div class="left">
              
              <h4 style={{ textTransform: "capitalize",marginTop:"100px" }}>
                {this.state.info.role}
              </h4>

              <div className="edit-icons">
                <i
                  class="fas fa-edit fa-2x"
                  onClick={() => {
                    this.setState({
                      editing: !this.state.editing,
                      edit_info: { ...this.state }.info,
                    });
                  }}
                  ></i>
                {this.state.editing ? (
                  <i class="fas fa-check fa-2x" onClick={this.onSubmit}></i>
                ) : null}
              </div>
              <Link to={{pathname:'/student/change-password', state:{id:this.props.user.id}}}> <i class="fas fa-key fa-2x" style={{"color":"white"}}></i> </Link>
            </div>
            <div class="right">
              <div class="info">
                <h3>Information</h3>
                <div class="info_data">
                  <div class="data">
                    <h4>Name</h4>
                    {this.state.editing ? (
                      <InputField
                        value={{ ...this.state }.info.name}
                        label={"Name"}
                        field="name"
                        onChange={this.handleEdit}
                      ></InputField>
                    ) : (
                      <p>{this.state.info.name}</p>
                    )}
                  </div>
                  <div class="data">
                    <h4>Phone</h4>
                    {this.state.editing ? (
                      <InputField
                        value={{ ...this.state }.info.phone}
                        label={"Phone"}
                        field="phone"
                        onChange={this.handleEdit}
                      ></InputField>
                    ) : (
                      <p>{this.state.info.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div class="projects">
                <h3>Workplace</h3>
                <div class="projects_data">
                  <div class="data">
                    <h4>School</h4>
                    {this.state.editing ? (
                      <InputField
                        value={{ ...this.state }.info.school}
                        label={"School"}
                        field="school"
                        onChange={this.handleEdit}
                      ></InputField>
                    ) : (
                      <p>{this.state.info.school}</p>
                    )}
                  </div>
                  <div class="data">
                    <h4>Unique ID</h4>

                    <p>{this.state.info.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});
export default connect(mapStateToProps, null)(StudentInfo);
