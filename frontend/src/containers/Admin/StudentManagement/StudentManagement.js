import React, { Component } from "react";
import DataTables from "../../../components/Table/Table";
import MOCK_DATA from "../../../components/Table/MOCK.json";
import Modal from "../../../components/Modal/Modal";

import "./StudentManagement.css";
export class StudentManagement extends Component {
  state = {
    modalShow: false,
    targetRow: {},
    student_info: [],
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
    fetch("http://localhost/webproject/api/users?role=student", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  onSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: this.state.targetRow,
    };
    fetch("http://localhost/webproject/api/users?role=student", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    // this.fetch_data();
  }
  render() {
    return (
      <div>
        <h1 className="title">Student Management</h1>

        <DataTables
          data={MOCK_DATA}
          rowPerPage={5}
          rowClick={this.editHander}
        ></DataTables>

        <div className={this.state.modalShow ? "back-drop" : null}></div>
        <Modal
          show={this.state.modalShow}
          closeHandler={this.toggleModal}
          info={this.state.targetRow}
        ></Modal>
      </div>
    );
  }
}

export default StudentManagement;
