import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StudentTable from "../../components/Table/Table";
import MOCKDATA from "../../components/Table/MOCK.json";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import CourseDetailModal from "../../components/CourseDetailModal/CourseDetailModal";
import { HOST_URL } from "../../config";
import "./CourseDetail.css";
export default function CourseDetail() {
  let { id } = useParams(); // id cua lop hoc lay o day nay`




  
  // const [teacher, setTeacher] = useState(null);
  // const [detail, setDetail] = useState({
  //   id: 1,
  //   title: "title",
  //   description: "Course Description",
  // });

  const [pending_request, setPendingRequest] = useState([]);
  const [students, setStudents] = useState([]);
  const [show_pending_req, setShowPen] = useState(true);
  const [show_pending_modal, setShowPenModal] = useState(false);
  const [show_student_modal, setShowStudentModal] = useState(false);
  const [show_student, setShowStudent] = useState(false);
  const [target_row_pending, setTargetPending] = useState({});
  const [target_row_student, setTargetStudent] = useState({});
  const togglePendingModal = () => {
    setShowPenModal(!show_pending_modal);
    setTargetPending({});
  };
  const toggleStudentModal = () => {
    setShowStudentModal(!show_student_modal);
    setTargetStudent({});
  };

  const fetchData = () => {
    console.log("get course data from DB");
    var response = null;
    // api call pending request
    // setPendingRequest(response)
    // Quan lam phan nay di Quan oi
    // setStudents(response)
  };
  const togglePendingBar = () => {
    setShowPen(!show_pending_req);
  };
  const toogleStudentBar = () => {
    setShowStudent(!show_student);
  };

  const rowClickPending = (target_row) => {
    togglePendingModal();
    setTargetPending(target_row);
    
    
  };
  const rejectHandler = () => {
    // api call 
    var raw = target_row_pending
  }
  const approveHandler = () => {
    var raw = target_row_pending
    alert("Aproved")
  }
  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <div className="course_detail">
      {/* <div className="course-general-info">
        <h1> General Info </h1>
        <div className="course-field">
          <input required></input>
          <label>Course Title</label>
        </div>
        <div className="course-field">
          <input required></input>
          <label>Description</label>
        </div>

        <div className="teacher-selection">
          <Dropdown
            options={MOCKDATA}
            prompt="select teacher"
            value={teacher}
            field="first_name"
            onChange={(teacher) => setTeacher(teacher)}
          />
        </div>

        <Button> Update </Button>
      </div> */}

      <div className="toggle-bar" onClick={togglePendingBar}>
        <div className="toggle-arrow">
          {show_pending_req ? (
            <i class="fas fa-angle-double-down fa-2x"></i>
          ) : (
            <i class="fas fa-angle-double-right fa-2x"></i>
          )}
        </div>

        <span className="toggle-title"> Pending request </span>
      </div>
      {show_pending_req ? (
        <div className="pending">
          <StudentTable rowPerPage={6} data={MOCKDATA} rowClick={rowClickPending}></StudentTable>
        </div>
      ) : null}
      <div className="toggle-bar" onClick={toogleStudentBar}>
        <div className="toggle-arrow">
          {show_student ? (
            <i class="fas fa-angle-double-down fa-2x"></i>
          ) : (
            <i class="fas fa-angle-double-right fa-2x"></i>
          )}
        </div>

        <span className="toggle-title"> Manage student </span>
      </div>
      {show_student ? (
        <div className="pending">
          <StudentTable rowPerPage={6} data={MOCKDATA} ></StudentTable>
        </div>
      ) : null}
      <div className={show_pending_modal ? "back-drop" : null}></div>



      <CourseDetailModal
        show={show_pending_modal}
        closeHandler={togglePendingModal}
        rejectHandler = {rejectHandler}
        approveHandler = {approveHandler}
        
      >
        {show_pending_modal ? 
          <div style={{"padding":'20px',"display":"flex","flexDirection":"column","justifyContent":"space-around","height":"100%"}}>
            {Object.keys(target_row_pending).map((field,idx) => {
              return(
                
                <div className="field" key={idx}>
                <input value={target_row_pending[field]}
                  disabled
                  
                ></input>
                <label>{field}</label>
              </div>
              )
            })}
          </div>  : null
      }
      </CourseDetailModal>
    </div>
  );
}
