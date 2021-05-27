import React, { Component } from "react";
import "./TeacherCourseDetail.css";
import Table from "../../../components/Table/Table";
import Button from "../../../components/Button/Button";
import ExamAssesmentModal from "../../../components/ExamAssesmentModal/ExamAssesmentModal";
import Backdrop from "../../../components/Backdrop/Backdrop";
import PopUp from "../../../components/PopUp/PopUp";
import { Link } from "react-router-dom";
import { HOST_URL } from "../../../config";
export class TeacherCourseDetail extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    id: this.props.match.params.id,
    toogleState: 1,
    class_notification: "",
    class_notification_list: [],
    class_material: "",
    class_material_list: [],
    class_exam_list: [],
    student_list: [],
    input_modal_show: false,
    target_exam: null,
    mark_input_data: null,
    new_exam_content: { content: "", taskname: "" },
    material_file: null,
  };
  onChange = (e) => {
    this.setState({ material_file: e.target.files[0] });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const file = this.state.material_file;

    const formData = new FormData();

    formData.append("material", file);

    formData.append("course_id", this.state.id);

    var tzoffset = new Date().getTimezoneOffset() * 60000;
    const time_created = new Date(Date.now() - tzoffset).toISOString();
    const date = time_created.split("T")[0];
    const time = time_created.split("T")[1].split(".")[0];

    formData.append("time_created", date + " " + time);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(`${HOST_URL}/documents`, requestOptions)
      .then((response) => {
        // console.log(response.status);
        // console.log(response.statusText);

        if (response.status !== 201) {
          var newStatus = { ...this.state.status };
          newStatus.code = response.status;
          this.setState({ status: newStatus });
        } else {
          this.setState({ material_file: null });
          this.fetch_course_material();
        }

        return response.json();
      })
      .then((result) => {
        var newStatus = { ...this.state.status };
        newStatus.msg = result;
        this.setState({ status: newStatus });
      })
      .catch((error) => console.log("error", error));
  };
  downloadMaterialRequest = (id, filename) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(`${HOST_URL}/documents/${id}`, requestOptions)
      .then((response) => response.blob())
      .then((blob) => {
        var objectURL = window.URL.createObjectURL(blob);
        // console.log(objectURL);
        this.setState({ obj: objectURL });
        const link = document.createElement("a");
        link.href = objectURL;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log("error", error));
  };

  newExamOnSubmit = () => {
    var exam = this.state.new_exam_content;
    // console.log(exam);
    var course_id = this.state.id;
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const time_created = new Date(Date.now() - tzoffset).toISOString();
    const date = time_created.split("T")[0];
    const time = time_created.split("T")[1].split(".")[0];
    const raw = JSON.stringify({
      exam: {
        course_id: course_id,
        taskname: exam.taskname,
        content: exam.content,
        created_at: date + " " + time,
      },
      students: this.state.student_list,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${HOST_URL}/exams`, requestOptions)
      .then((response) => {
        if (response.status !== 201) {
          var newStatus = { ...this.state.status };
          newStatus.code = response.status;
          this.setState({ status: newStatus });
        } else {
          this.setState({ new_exam_content: { content: "", taskname: "" } });
          this.fetch_course_exams();
        }

        return response.json();
      })
      .then((result) => {
        var newStatus = { ...this.state.status };
        newStatus.msg = result;
        this.setState({ status: newStatus });
      })
      .catch((error) => console.log("error", error));
    //api call
  };
  examScoreUpdate = () => {
    const scores = this.state.mark_input_data;

    const exam_id = this.state.target_exam.id;
    var raw = JSON.stringify(
      scores.map((score_info) => ({
        student_id: score_info.student_id,
        score: score_info.score,
      }))
    );
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };
    fetch(`${HOST_URL}/exams/${exam_id}`, requestOptions)
      .then((response) => {
        var newStatus = { ...this.state.status };
        newStatus.code = response.status;
        this.setState({ status: newStatus });
        this.setState({ input_modal_show: false });

        return response.json();
        // this.setState({ input_modal_show: false });
      })
      .then((result) => {
        var newStatus = { ...this.state.status };
        newStatus.msg = result;
        this.setState({ status: newStatus });
      })
      .catch((error) => console.log("error", error));
  };

  examAssesHandler = (target_row) => {
    this.setState({ input_modal_show: true });
    this.setState({ target_exam: target_row });
  };
  examAssesCancelHandler = () => {
    this.setState({ input_modal_show: false });
    this.setState({ target_exam: null });
    this.setState({ mark_input_data: null });
  };
  newExamContentChangeHandler = (value, field) => {
    let newExam = this.state.new_exam_content;
    newExam[field] = value;
    this.setState({ new_exam_content: newExam });
  };
  notificationChangeHandler = (e) => {
    this.setState({ class_notification: e.target.value });
  };
  handleCreateNotification = () => {
    const notification = this.state.class_notification;
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const time_created = new Date(Date.now() - tzoffset).toISOString();
    const date = time_created.split("T")[0];
    const time = time_created.split("T")[1].split(".")[0];
    const raw = JSON.stringify({
      content: notification,
      course_id: this.state.id,
      create_at: date + " " + time,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${HOST_URL}/course_notifications`, requestOptions)
      .then((response) => {
        if (response.status !== 201) {
          var newStatus = { ...this.state.status };
          newStatus.code = response.status;
          this.setState({ status: newStatus });
        } else {
          this.setState({ class_notification: "" });
          this.fetch_course_notifications();
        }
        return response.json();
        // response.json();
        // console.log(response);
        // this.setState({class_notification: ""});
        // this.setState({class_notification: ""});
        // this.fetch_data();
      })
      .then((result) => {
        var newStatus = { ...this.state.status };
        newStatus.msg = result;
        this.setState({ status: newStatus });
      })
      .catch((error) => console.log("error", error));
  };

  toggleTab = (index) => {
    this.setState({ toogleState: index });
  };
  fetch_data = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${HOST_URL}/courses/${this.state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // const class_notification_list = result.notifications;
        // const class_material_list = result.material;
        // const class_exam_list = result.exams;
        const student_list = result.students;

        // this.setState({ class_notification_list: class_notification_list });
        // this.setState({ class_material_list: class_material_list });
        this.setState({ student_list: student_list });
        // this.setState({class_exam_list: class_exam_list});
      })
      .catch((error) => console.log("error", error));
    this.fetch_course_notifications();
    this.fetch_course_material();
    this.fetch_course_exams();
  };

  fetch_course_notifications = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(
      `${HOST_URL}/course_notifications?course_id=${this.state.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ class_notification_list: result });
      })
      .catch((error) => console.log("error", error));
  };

  fetch_course_material = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/documents?course_id=${this.state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        this.setState({
          class_material_list: result,
        });
      });
  };

  fetch_course_exams = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/exams?course_id=${this.state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        this.setState({
          class_exam_list: result,
        });
      });
  };

  componentDidMount() {
    this.fetch_data();
  }
  render() {
    let toggleState = this.state.toogleState;
    const class_notification_list = this.state.class_notification_list;
    const class_material_list = this.state.class_material_list;
    const class_exam_list = this.state.class_exam_list;
    const student_list = this.state.student_list;
    // console.log(class_notification_list);
    var scores = [];
    if (this.state.target_exam) {
      scores = class_exam_list
        .filter((exam_info) => exam_info.exam.id === this.state.target_exam.id)
        .map((exam) => exam.scores);
    }
    scores = scores[0];

    return (
      <div>
        {this.state.status &&
        Object.keys(this.state.status).includes("code") ? (
          <React.Fragment>
            <PopUp
              show={this.state.status ? true : false}
              closeHandler={() => this.setState({ status: null })}
              msg={this.state.status}
              redirect={() => this.setState({ status: null })}
            ></PopUp>
            <Backdrop
              toggleBackdrop={() => this.setState({ status: null })}
            ></Backdrop>
          </React.Fragment>
        ) : null}
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
            <div className="noti_creator">
              <div className="field">
                <input
                  type="text"
                  required
                  value={this.state.class_notification}
                  onChange={this.notificationChangeHandler}
                ></input>
                <label>Pin message</label>
              </div>

              <Button onClick={this.handleCreateNotification}> Send </Button>
            </div>

            {class_notification_list.map((noti) => (
              <div className="plan-item">
                <div className="datetime">{noti.create_at}</div>
                <div className="content">
                  <p>{noti.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div //tab material
            className={
              toggleState === 2 ? "contents  active-content" : "contents"
            }
          >
            <div className="material">
              <div className="material-board">
                {class_material_list.map((material) => (
                  <div className="plan-item">
                    <div className="datetime">{material.time_created}</div>
                    <div className="content">
                      <Link to="#">
                        <div
                          onClick={() =>
                            this.downloadMaterialRequest(
                              material.id,
                              material.filename
                            )
                          }
                        >
                          {material.filename}
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="material-uploader">
                <form onSubmit={this.onSubmit}>
                  <div className="fileUpload">
                    <input
                      type="file"
                      name="material"
                      onChange={this.onChange}
                    />
                    <span>Choose material (.docx/.pdf)</span>
                  </div>

                  <Button type="submit">Upload File</Button>
                </form>
              </div>
            </div>
          </div>

          <div //tab student
            className={
              toggleState === 3 ? "contents  active-content" : "contents"
            }
          >
            {student_list.length > 0 ? (
              <Table
                rowPerPage={Math.min(5, student_list.length)}
                data={student_list}
              ></Table>
            ) : (
              ""
            )}
          </div>

          <div //assesment
            className={
              toggleState === 4 ? "contents  active-content" : "contents"
            }
          >
            <div className="assesment-container">
              <div className="assesment-table">
                {class_exam_list.length > 0 ? (
                  <>
                    <Table
                      data={class_exam_list.map((exam_info) => exam_info.exam)}
                      rowPerPage={5}
                      rowClick={(target_row) => {
                        this.examAssesHandler(target_row);
                      }}
                    ></Table>
                    <ExamAssesmentModal
                      show={this.state.input_modal_show}
                      closeHandler={this.examAssesCancelHandler}
                      updateHandler={this.examScoreUpdate}
                    >
                      <div>
                        {this.state.input_modal_show ? (
                          <Table
                            data={scores}
                            rowPerPage={5}
                            editable={true}
                            enabledEditField={"score"}
                            onEdit={(updatedMarkData) => {
                              this.setState({
                                mark_input_data: updatedMarkData,
                              });
                            }} // danh sach diem update
                          ></Table>
                        ) : null}
                      </div>
                    </ExamAssesmentModal>
                    <div>
                      {this.state.input_modal_show ? (
                        <Backdrop toggleBackdrop={this.examAssesCancelHandler}>
                          {" "}
                        </Backdrop>
                      ) : null}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="create-exam">
                <div className="exam-content">
                  <h1>Exam Content</h1>
                  <textarea
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      this.newExamContentChangeHandler(
                        e.target.value,
                        "content"
                      )
                    }
                    value={this.state.new_exam_content.content}
                  ></textarea>
                </div>
                <div
                  style={{
                    margin: "20px auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* <InputField
                    type="text"
                    label="Taskname"
                    onChange={(_, value) => {
                      this.newExamContentChangeHandler(value, "taskname");
                    }}
                  ></InputField> */}
                  <div className="field">
                    <input
                      type="text"
                      required
                      value={this.state.new_exam_content.taskname}
                      onChange={(e) => {
                        let new_exam_content = this.state.new_exam_content;
                        new_exam_content.taskname = e.target.value;
                        this.setState({ new_exam_content: new_exam_content });
                      }}
                    ></input>
                    <label>Task name</label>
                  </div>
                </div>

                <Button onClick={this.newExamOnSubmit}> Submit </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherCourseDetail;
