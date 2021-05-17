import React, { Component } from "react";
import DataTables from "../../../components/Table/Table";
import MOCK_DATA from "../../../components/Table/MOCK.json";
import {HOST_URL} from "../../../config";
import Modal from "../../../components/Modal/Modal";
import "./TeacherManagement.css";
export class TeacherManagement extends Component {
  state = {
    modalShow: false,
    targetRow: {},
    teacher_info: [],
  };
  toggleModal = () => {
    this.setState({ modalShow: !this.state.modalShow });
    this.setState({ targetRow: {} });
  };
  editHander = (target_row) => {
    this.toggleModal();
    this.setState({ targetRow: target_row });
  };
  fetch_data() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(HOST_URL + "/users?role=teacher", requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({ teacher_info: result }))
      .catch((error) => console.log("error", error));
  }

  onSubmit = (update_info) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(update_info),
    };

    fetch(HOST_URL + `/users/${this.state.targetRow["id"]}`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.fetch_data())
      .catch((error) => console.log("error", error));
  };
  componentDidMount() {
    this.fetch_data();
  }
  render() {
    return (
      <div>
        <h1 className="title">Teacher Management</h1>
        {this.state.teacher_info.length > 0 ? (
          <DataTables
            data={this.state.teacher_info}
            rowPerPage={5}
            rowClick={this.editHander}
          ></DataTables>
        ) : null}

        <div className={this.state.modalShow ? "back-drop" : null}></div>
        <Modal
          disabled_field={["id", "role"]}
          show={this.state.modalShow}
          closeHandler={this.toggleModal}
          onSubmit={this.onSubmit}
          info={this.state.targetRow}
        ></Modal>
      </div>
    );
  }
}

export default TeacherManagement;
