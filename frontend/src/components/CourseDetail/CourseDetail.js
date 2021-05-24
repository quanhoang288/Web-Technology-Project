import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StudentTable from "../../components/Table/Table";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import CourseDetailModal from "../../components/CourseDetailModal/CourseDetailModal";
import { HOST_URL } from "../../config";
import "./CourseDetail.css";
export default function CourseDetail() {
  let { id } = useParams(); // id cua lop hoc lay o day nay`

  const [courseState, setCourseState] = useState(0)
  const [pending_request, setPendingRequest] = useState([]);
  const [students, setStudents] = useState([]);
  const [show_pending_req, setShowPen] = useState(false);
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
  const updateCourseState = () => {
    const newEnrolState = courseState['id']
    // api call PUT method

  }

  const fetchData = (id) => {
    // api call pending request
    var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");  
		var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
		};
    
		fetch(`${HOST_URL}/courses/${id}`, requestOptions)
		.then((response) => response.json())
		.then((result) => {

      const student_list = result.students;
      console.log(result.students);
      let pending_list = student_list.filter(student => student.status === '1');
      console.log(pending_list)
      let accepted_list = student_list.filter(student => student.status === '2');
      console.log(accepted_list);
      pending_list = pending_list.map(student => ({id: student.id, name: student.name, phone: student.phone, school: student.school}));
      accepted_list = accepted_list.map(student => ({id: student.id, name: student.name, phone: student.phone, school: student.school}));
   
      setPendingRequest(pending_list);
      setStudents(accepted_list);
      
    })
		.catch((error) => console.log("error", error));

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
  const rowClickKick = (target_row) => {
    toggleStudentModal();
    setTargetStudent(target_row);
  }

  const kickStudentHandler = () => {
    const sid = target_row_student['id'] //id of student
    const cid = id // id of course
    // api put kick
    console.log(`kick ${sid} in ${cid}`)
  }


  const rejectHandler = () => {
    // api call 
    
    const student_id = target_row_pending.id;
    const update = JSON.stringify({status: 3});
    var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");  
		var requestOptions = {
		method: "PUT",
		headers: myHeaders,
    body: update,
		redirect: "follow",
		};
    // console.log(`${HOST_URL}/courses/${id}`);
		fetch(`${HOST_URL}/enroll?student_id=${student_id}&course_id=${id}`, requestOptions)
		.then((response) => {
      console.log(response);
      alert("Rejected");
      setShowPenModal(false);
      var pending_list = pending_request;
      const idx = pending_list.indexOf(target_row_pending);
      pending_list = pending_list.splice(idx, 1);      
      setPendingRequest(pending_request);
      togglePendingBar();

    })
		.catch((error) => console.log("error", error));
  }
  const approveHandler = () => {
    const student_id = target_row_pending.id;
    const update = JSON.stringify({status: 2});
    var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");  
		var requestOptions = {
		method: "PUT",
		headers: myHeaders,
    body: update,
		redirect: "follow",
		};
    // console.log(`${HOST_URL}/courses/${id}`);
		fetch(`${HOST_URL}/enroll?student_id=${student_id}&course_id=${id}`, requestOptions)
		.then((response) => {
      console.log(response);
      alert("Aproved");
      setShowPenModal(false);
      var pending_list = pending_request;
      var accepted_list  = students;
      const idx = pending_list.indexOf(target_row_pending);
      pending_list = pending_list.splice(idx, 1);
      accepted_list.push(target_row_pending);
      setPendingRequest(pending_request);
      setStudents(accepted_list);
      togglePendingBar();
      
    })
		.catch((error) => console.log("error", error));
    
    
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
      <div className="course_state">
        <h1>Set course state</h1>
        <Dropdown
          prompt="Set course state"
          options={[
            { id: 1, state: "On-going" },
            { id: 2, state: "Closed" },
          ]}
          field="state"
          value={courseState ? courseState["state"] : null}
          onChange={(option) => {
            if (option) {
              setCourseState(option);
            } else {
              setCourseState(null);
            }
          }}
        ></Dropdown>
        <Button onClick={updateCourseState}> Update </Button>
      </div>
      
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
          <StudentTable
            rowPerPage={Math.min(6, pending_request.length)}
            data={pending_request}
            rowClick={rowClickPending}
          ></StudentTable>
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
          <StudentTable
            rowPerPage={Math.min(6, students.length)}
            data={students}
            rowClick={rowClickKick}
          ></StudentTable>
        </div>
      ) : null}
      <div
        className={
          show_pending_modal || show_student_modal ? "back-drop" : null
        }
      ></div>

      <CourseDetailModal
        show={show_pending_modal}
        closeHandler={togglePendingModal}
        leftButtonHandler={rejectHandler}
        leftlabel = 'Reject'
        rightButtonHandler={approveHandler}
        rightlabel = 'Approve'
      >
        {show_pending_modal ? (
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            {Object.keys(target_row_pending).map((field, idx) => {
              return (
                <div className="field" key={idx}>
                  <input value={target_row_pending[field]} disabled></input>
                  <label>{field}</label>
                </div>
              );
            })}
          </div>
        ) : null}
      </CourseDetailModal>

      <CourseDetailModal
        show={show_student_modal}
        closeHandler={toggleStudentModal}
        leftlabel="Kick"
        leftButtonHandler={kickStudentHandler}
        rightlabel='Cancel'
        rightButtonHandler={toggleStudentModal}


      >
        {show_student_modal ? (
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            {Object.keys(target_row_student).map((field, idx) => {
              return (
                <div className="field" key={idx}>
                  <input value={target_row_student[field]} disabled></input>
                  <label>{field}</label>
                </div>
              );
            })}
          </div>
        ) : null}
      </CourseDetailModal>
    </div>
  );
}
