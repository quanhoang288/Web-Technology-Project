import React, { Component } from "react";
import "./TeacherCourseDetail.css";
import Table from "../../../components/Table/Table";
import MOCK_DATA from "../../../components/Table/MOCK.json";
import InputField from "../../../components/InputField/InputField";
import { Link } from "react-router-dom";
export class TeacherCourseDetail extends Component {
  state = {
    id: this.props.match.params.id,
    toogleState: 1,
    class_notification: "",
    class_notification_list: [],
    class_material: "",
    class_material_list: [],
    student_list: [],
  };
  toggleTab = (index) => {
    this.setState({ toogleState: index });
  };
  fetch_data = () => {};
  render() {
    let toggleState = this.state.toogleState;

    return (
      <div>
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => this.toggleTab(1)}
          >
            General
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => this.toggleTab(2)}
          >
            Material
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => this.toggleTab(3)}
          >
            Students
          </button>
          <button
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => this.toggleTab(4)}
          >
            Assessment
          </button>
        </div>

        <div className="content-tabs">
          <div // tab notification
            className={
              toggleState === 1 ? "contents  active-content" : "contents"
            }
          >
            <InputField
              type="text"
              label="Pin message"
              onChange={(_, value) =>
                this.setState({ class_notification: value })
              }
            ></InputField>

            <div className="plan-item">
              <div className="datetime">2020-05</div>
              <div className="content">
                <Link to="#">
                  <p>HJjhdgasjhdjhgsajhgdjh</p>
                </Link>
              </div>
              <i class="fas fa-edit"></i>
            </div>
            <div className="plan-item">
              <div className="datetime">2020-05</div>
              <div className="content">
                <Link to="#">
                  <p>De bai 1 : mieu ta 1 con cho</p>
                </Link>
              </div>
              <i class="fas fa-edit"></i>
            </div>
          </div>

          <div //tab material
            className={
              toggleState === 2 ? "contents  active-content" : "contents"
            }
          >
            <div className="material">
              <label>Push material </label>
              <textarea></textarea>
              <div className="plan-item">
                <div className="datetime">2020-05</div>
                <div className="content">
                  <Link to="#">
                    <p>De bai 1 : mieu ta 1 con cho</p>
                  </Link>
                </div>
                <i class="fas fa-edit"></i>
              </div>
            </div>
          </div>

          <div //tab student
            className={
              toggleState === 3 ? "contents  active-content" : "contents"
            }
          >
            <Table rowPerPage={5} data={this.state.student_list}></Table>
          </div>

          <div //assesment
            className={
              toggleState === 4 ? "contents  active-content" : "contents"
            }
          ></div>
        </div>
      </div>
    );
  }
}

export default TeacherCourseDetail;
