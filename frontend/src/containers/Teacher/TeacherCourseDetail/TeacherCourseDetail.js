import React, { Component } from "react";
import "./TeacherCourseDetail.css";
import Table from "../../../components/Table/Table";
import MOCK_DATA from "../../../components/Table/MOCK.json";
import InputField from "../../../components/InputField/InputField";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import ExamAssesmentModal from '../../../components/ExamAssesmentModal/ExamAssesmentModal'
import Backdrop from '../../../components/Backdrop/Backdrop'
import { HOST_URL } from "../../../config";
export class TeacherCourseDetail extends Component {
  state = {
    id: this.props.match.params.id,
    toogleState: 1,
    class_notification: "",
    class_notification_list: [],
    class_material: "",
    class_material_list: [],
    class_exam_list: [],
    student_list: [],
    input_modal_show:false,
    target_exam:null,
  };

  examAssesHandler = (target_row)=> {
    this.setState({input_modal_show:true})
    this.setState({target_exam:target_row})
  }
  examAssesCancelHandler = ()=> {
    this.setState({input_modal_show:false})
    this.setState({target_exam:null})
  }
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
          // console.log(result);
          
          const class_notification_list =  result.notifications;
          const class_material_list = result.material;
          // const class_exam_list = result.exams;
          const student_list = result.students;
          // console.log(class_notification_list);
          // console.log(class_material_list);
          // console.log(class_exam_list);
          // console.log(student_list);
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
  componentDidMount(){
    this.fetch_data();
  }

  handleCreateExam = () => {

  }
  render() {
    let toggleState = this.state.toogleState;
    const class_notification_list =  this.state.class_notification_list;
    const class_material_list = this.state.class_material_list;
    const class_exam_list = this.state.class_exam_list;
    const student_list = this.state.student_list;
    // console.log(class_notification_list);
    // console.log(class_material_list);
    console.log(class_exam_list);
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

            {
              class_notification_list.map(noti => 
                <div className="plan-item">
                <div className="datetime">{noti.create_at}</div>
                <div className="content">
                    <p>{noti.content}</p>
                </div>
              </div>
              )
            }

            {/* <div className="plan-item">
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
            </div> */}
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
            {student_list.length > 0 ? <Table 
            rowPerPage={Math.min(5, student_list.length)} 
            data={student_list}></Table> : ''
            }
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
                <ExamAssesmentModal show={this.state.input_modal_show}
                  closeHandler={this.examAssesCancelHandler}
                  updateHandler = {() => {console.log("Update")}}

                
                >
                  <div>
                  <Table data={
                    class_exam_list.map(exam_info => exam_info.scores)
                  } rowPerPage={5}
                  editable={true}
                  rowClick={(target_row)=> {this.examAssesHandler(target_row)}}
                ></Table>
                  </div>
                </ExamAssesmentModal>
                <div>
                  {this.state.input_modal_show ? <Backdrop toggleBackdrop={this.examAssesCancelHandler}> </Backdrop> :null}
                </div>
              </> : ''
              }
              </div>
              <div className="create-exam">
                <div className="exam-content">
                  <h1>Exam Content</h1>
                  <textarea style={{"width":"100%"}}></textarea>
                </div>
                <div style={{"margin":"20px auto","width":"100%"}}>
                  <InputField type="text" label="Taskname"
                  onChange={(_, value) =>
                    this.setState({ class_notification: value })
                  }
                  >

                  </InputField>
                </div>

                <Button onClick={this.handleCreateExam}> Submit </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherCourseDetail;
