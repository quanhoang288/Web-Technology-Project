import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StudentTable from "../../components/Table/Table";
import MOCKDATA from "../../components/Table/MOCK.json";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";

import { HOST_URL } from "../../config";
import "./CourseDetail.css";
export default function CourseDetail() {
  let { id } = useParams();
  // const [teacher, setTeacher] = useState(null);
  // const [detail, setDetail] = useState({
  //   id: 1,
  //   title: "title",
  //   description: "Course Description",
  // });


  const [pending_request, setPendingRequest] = useState([])
  const [students, setStudents] = useState([])
  const [show_pending_req, setShowPen] = useState(true)
  const [show_student, setShowStudent] = useState(false)
  const fetchData = (id) => {
    console.log("get course data from DB");
    //api call
  };
  const togglePendingBar = ()=>{
    setShowPen(!show_pending_req)
  }
  const toogleStudentBar = ()=> {
    setShowStudent(!show_student)
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
          <div className='toggle-arrow'>
          {
            show_pending_req ? <i class="fas fa-angle-double-down fa-2x"></i> :
            <i class="fas fa-angle-double-right fa-2x"></i>
          }
          </div>

          <span className='toggle-title'> Pending request </span>
        </div>
        {
          show_pending_req ? 
          <div className='pending'>
          
          <StudentTable rowPerPage={6} data={MOCKDATA}></StudentTable>
          </div>:null
          
        }
        <div className="toggle-bar" onClick={toogleStudentBar}>
          <div className='toggle-arrow'>
          {
            show_student ? <i class="fas fa-angle-double-down fa-2x"></i> :
            <i class="fas fa-angle-double-right fa-2x"></i>
          }
          </div>

          <span className='toggle-title'> Manage student </span>
        </div>
        {
          show_student ? 
          <div className='pending'>
          
          <StudentTable rowPerPage={6} data={MOCKDATA}></StudentTable>
          </div>:null
          
        }

        
      
    </div>
  );
}
