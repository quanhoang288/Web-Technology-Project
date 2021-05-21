import React, { Component } from "react";
import "./TeacherCourseDetail.css";
import Table from "../../../components/Table/Table";
import MOCK_DATA from "../../../components/Table/MOCK.json";
import axios from "axios";
import InputField from "../../../components/InputField/InputField";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import ExamAssesmentModal from "../../../components/ExamAssesmentModal/ExamAssesmentModal";
import Backdrop from "../../../components/Backdrop/Backdrop";
import FileUploader from "../../../components/ImageUploader/ImageUploader";
import { HOST_URL } from "../../../config";
export class TeacherCourseDetail extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
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
  onChange(e) {
    this.setState({ material_file: e.target.files[0] });
  }
  async onSubmit(e) {
    e.preventDefault();
    let res = await this.uploadFile(this.state.material_file);
    console.log(res.data);
  }
  async uploadFile(file) {
    const formData = new FormData();

    formData.append("avatar", file);

    return await axios.post("http://localhost/imguploader/test.php", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }

  materialUploadHandler = () => {
    let formData = new FormData();
    formData.append("file", this.state.material_file);

    fetch("http://localhost/imguploader/test.php", {
      body: formData,
      method: "POST",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
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
  newExamOnSubmit = () => {
    var exam = this.state.new_exam_content;
    var course_id = this.state.id;
    console.log(exam);
    //api call
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
     
          
          const class_notification_list =  result.notifications;
          const class_material_list = result.material;
          // const class_exam_list = result.exams;
          const student_list = result.students;
         
          this.setState({class_notification_list: class_notification_list});
          this.setState({class_material_list: class_material_list});
          this.setState({student_list: student_list});
          // this.setState({class_exam_list: class_exam_list});
        })
      .catch((error) => console.log("error", error));
      
      fetch(`${HOST_URL}/exams?course_id=${this.state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          this.setState({class_exam_list: result});
        })
      .catch((error) => console.log("error", error));
  };
  componentDidMount() {
    this.fetch_data();
  }

  handleCreateExam = () => {

  }
  render() {
    let toggleState = this.state.toogleState;
    const class_notification_list = this.state.class_notification_list;
    const class_material_list = this.state.class_material_list;
    const class_exam_list = this.state.class_exam_list;
    const student_list = this.state.student_list;
    // if (class_exam_list.length > 0){
    //   console.log(class_exam_list[0].scores);
    // }

    var scores = [];
    if (this.state.target_exam){
      scores = class_exam_list.filter(exam_info => exam_info.exam.id == this.state.target_exam.id).map(exam=>exam.scores);
    }
    // console.log(this.state.target_exam.id)

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
                <div className="plan-item">
                  <div className="datetime">2020-01-02</div>
                  <div>File name</div>
                </div>
              </div>
              <div className="material-uploader">
                {/* <FileUploader
                  title="Upload material"
                  onChange={(file) => {
                    var prevState = { ...this.state };
                    prevState.material_file = file;
                    this.setState(prevState);
                  }}
                ></FileUploader> */}

                <form onSubmit={this.onSubmit}>
                  <h1> React File Upload Example</h1>
                  <input type="file" name='avatar' onChange={this.onChange} />
                  <button type="submit">Upload File</button>
                </form>

                <Button onClick={this.materialUploadHandler}></Button>
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
                { class_exam_list.length > 0 ?
                <>
                <Table 
                data={class_exam_list.map(exam_info => exam_info.exam)} rowPerPage={5}
                  rowClick={(target_row)=> {this.examAssesHandler(target_row)}}
                ></Table>
                <ExamAssesmentModal
                  show={this.state.input_modal_show}
                  closeHandler={this.examAssesCancelHandler}
                  updateHandler={() => {
                    console.log("Update");
                  }}
                >
                  <div>
                    {
                      this.state.input_modal_show ? 
                      <Table data={
                       scores
                      } rowPerPage={5}
                      editable={true}
                      enabledEditField ={"Mark"}
                      onEdit = {(updatedMarkData) => {this.setState({mark_input_data:updatedMarkData})}} // danh sach diem update
                      
                    ></Table>
                    : null
                    }
                  
                  </div>
                </ExamAssesmentModal>
                <div>
                  {this.state.input_modal_show ? (
                    <Backdrop toggleBackdrop={this.examAssesCancelHandler}>
                      {" "}
                    </Backdrop>
                  ) : null}
                </div>
              </> : ''
              }
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
                  ></textarea>
                </div>
                <div style={{ margin: "20px auto", width: "100%" }}>
                  <InputField
                    type="text"
                    label="Taskname"
                    onChange={(_, value) => {
                      this.newExamContentChangeHandler(value, "taskname");
                    }}
                  ></InputField>
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
