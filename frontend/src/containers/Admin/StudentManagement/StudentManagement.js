import React, { Component } from "react";
import DataTables from "../../../components/Table/Table";
import MOCK_DATA from "../../../components/Table/MOCK.json";
import Modal from "../../../components/Modal/Modal";
import {HOST_URL} from "../../../config";
import Backdrop from "../../../components/Backdrop/Backdrop";
import PopUp from "../../../components/PopUp/PopUp";
import "./StudentManagement.css";
export class StudentManagement extends Component {
  state = {
    modalShow: false,
    targetRow: {},
    student_info: [],
    status: null,
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
    fetch(HOST_URL + "/users?role=student", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ student_info: result })
        this.setState({modalShow:false})
      })
      .catch((error) => console.log("error", error));
  }

  onSubmit = (update_info) => {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(update_info),
    };
    console.log(update_info)
    console.log(JSON.stringify(update_info))
    
    fetch(HOST_URL + `/users/${this.state.targetRow['id']}`, requestOptions)
      .then((response) => {
          var newStatus = {...this.state.status}
          newStatus.code = response.status
          this.setState({status:newStatus})
          this.setState({modalShow: false});
          return response.json();
      })
      .then((result) => {
        var newStatus = {...this.state.status};
        newStatus.msg = result;
        this.setState({status:newStatus});
        this.fetch_data();
      })
      .catch((error) => console.log("error", error));
  };
  componentDidMount() {
    this.fetch_data();
  }
  render() {
    return (
      <div>
        {this.state.status ? (
          <React.Fragment>
            <PopUp
              show={this.state.status ? true : false}
              closeHandler={() => this.setState({ status: null })}
              msg={this.state.status}
              redirect={() => {
                this.setState({ status: null })
              }}
            ></PopUp>
            <Backdrop
              toggleBackdrop={() => this.setState({ status: null })}
            ></Backdrop>
          </React.Fragment>
        ) : null}
        <h1 className="title">Student Management</h1>
        {this.state.student_info.length > 0 ? 
          <DataTables
            data={this.state.student_info}
            hidden_field = {['id']}
            rowPerPage={5}
            rowClick={this.editHander}
          ></DataTables>
         : null}

        <div className={this.state.modalShow ? "back-drop" : null}></div>
        <Modal
          disabled_field={['id','role','active']}
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
