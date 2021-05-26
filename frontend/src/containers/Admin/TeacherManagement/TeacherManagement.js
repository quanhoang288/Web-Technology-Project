import React, { Component } from "react";
import DataTables from "../../../components/Table/Table";
import { int_to_time } from "../../../helper";
import { HOST_URL } from "../../../config";
import Modal from "../../../components/Modal/Modal";
import TeacherScheduleModal from "../../../components/GeneralModal/GeneralModal";
import "./TeacherManagement.css";
export class TeacherManagement extends Component {
  state = {
    modalShow: false,
    targetRow: {},
    teacher_info: [],
    scheduleModalShow: false,
    teacher_schedule: null,
  };
  toggleInfoModal = () => {
    console.log("OK")
    this.setState({ modalShow: !this.state.modalShow });
    this.setState({ targetRow: {} });
  };
  toggleScheduleModal = () => {
    this.setState({ scheduleModalShow: !this.state.scheduleModalShow });
    this.setState({ targetRow: {} });
  };
  fetch_schedule = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${HOST_URL}/schedule?user_id=${id}&role=teacher`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const schedule = result.map((item) => int_to_time(item));
        this.setState({ teacher_schedule: schedule });
      })
      .catch((error) => console.log("error", error));
  };
  editHander = (target_row) => {
    this.toggleInfoModal();

    this.setState({ targetRow: target_row });
  };
  showSchedule = (target_row) => {
    this.setState({ scheduleModalShow: !this.state.scheduleModalShow });
    this.setState({ targetRow: target_row });
    this.fetch_schedule(target_row['id'])
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
      .then((result) => {
        this.fetch_data();
        this.setState({ modalShow: false });
      })
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
            onRightClick={this.showSchedule}
          ></DataTables>
        ) : null}

        <div
          className={
            this.state.modalShow || this.state.scheduleModalShow
              ? "back-drop"
              : null
          }
        ></div>
        <Modal
          disabled_field={["id", "role", "active"]}
          show={this.state.modalShow}
          closeHandler={this.toggleInfoModal}
          onSubmit={this.onSubmit}
          info={this.state.targetRow}
        ></Modal>

        {this.state.teacher_schedule ? (
          <React.Fragment>
            <TeacherScheduleModal
              show={this.state.scheduleModalShow}
              title="Schedule"
              closeHandler={this.toggleScheduleModal}
            >
              <DataTables
              data={this.state.teacher_schedule}
              rowPerPage={5}
           
              ></DataTables>
            </TeacherScheduleModal>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default TeacherManagement;
