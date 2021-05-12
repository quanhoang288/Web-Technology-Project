import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StudentTable from "../../components/Table/Table";
import MOCKDATA from "../../components/Table/MOCK.json";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from '../../components/Button/Button'
import axios from "axios";
import { HOST_URL } from "../../config";
import "./CourseDetail.css";
export default function CourseDetail() {
  let { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [detail, setDetail] = useState({
    id: 1,
    title: "title",
    description: "Course Description",
  });
  const fetchData = (id) => {
    console.log("get course data from DB");
    //api call
  };
  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <div className="course-detail">
      <div className="course-general-info">
        <h1> General Info </h1>
        <div className="course-field">
          <input required ></input>
          <label>Course Title</label>
        </div>
        <div className="course-field">
          <input required ></input>
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
        <div className="sched">
            <div className="date-picker">
                <label>DatePicker</label>
                <Dropdown 
                    options={
                        [{
                            id:1,weekday:"Sunday",
                            id:2,weekday:"Monday",
                            id:3,weekday:"Tuesday",
                        }]
                    }
                    prompt="select weekday"
                    value="Weekday"
                    field='weekday'
                ></Dropdown>
            </div>
            <div className="time-picker">
            <label>Timepicker</label>
            <Dropdown
                    options={
                        [{
                            id:1,weekday:"Sunday",
                            id:2,weekday:"Monday",
                            id:3,weekday:"Tuesday",
                        }]
                    }
                    prompt="select weekday"
                    value="Weekday"
                    field='weekday'
                ></Dropdown>
            </div>
        </div>
        <Button> Update </Button>
      </div>
      <div className="student-table">
        <StudentTable rowPerPage={6} data={MOCKDATA}></StudentTable>
      </div>
      
    </div>
  );
}
