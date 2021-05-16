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
      .then((response) => response.json())
      .then((result) => this.setState({ student_info: result }))
      .catch((error) => console.log("error", error));
  }

  onSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: this.state.targetRow,
    };
    console.log(this.state.targetRow)
    fetch("http://localhost/webproject/api/users?role=student", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  componentDidMount() {
    this.fetch_data();
    console.log(this.state.student_info)
  }
  render() {
    return (
      <div>
        <h1 className="title">Student Management</h1>
        {this.state.student_info.length > 0 ? 
          <DataTables
            data={this.state.student_info}
            rowPerPage={5}
            rowClick={this.editHander}
          ></DataTables>
         : null}

        <div className={this.state.modalShow ? "back-drop" : null}></div>
        <Modal
          disabled_field={['id','role']}
          show={this.state.modalShow}
          closeHandler={this.toggleModal}
          onSubmit={this.onSubmit}
          info={this.state.targetRow}
        ></Modal>
      </div>
    );
  }
}

export default StudentManagement;
