import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseManagement.css";
import Carousel from "../../../components/Carousel/Carousel";
import Card from "../../../components/Card/Card";
import img from "../../../asset/eclass.png";
import "./CourseManagement.css";
import { HOST_URL } from "../../../config";
export class CourseManagement extends Component {
  state = {
    courses: [],
    q: "",
  };
  findCourseHandler = (e) => {
    this.setState({ q: e.target.value });
  };

  fetch_data() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(HOST_URL + "/courses", requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({ courses: result }))
      .catch((error) => console.log("error", error));
  }

  queryCourse = (query_field) => {
    if(this.state.q.length === 0 )
    {
      return this.state.courses
    }
    var courses = { ...this.state }.courses;
    var filterd_course = [];
    courses.forEach((course, idx) => {
      var keys = Object.keys(course);
      
      var q_keys = keys.filter((key) => query_field.includes(key))
      
      for (var i = 0; i < q_keys.length; i++) {
        
        if (course[q_keys[i]].indexOf(this.state.q) > 0 ) {
          filterd_course.push(course);
          break;
        }
      }
    });
    return filterd_course
  };
  componentDidMount() {
    this.fetch_data();
  }
  render() {
    const filterd_courses = this.queryCourse(['name'])
    
    
    return (
      <React.Fragment>
        <div className="billboard">
          <img src={img} />
          <div className="billboard-content">
            <h1>Dream up</h1>
            <p>
              Ambition accepted. Learn the latest skills to reach your
              professional goals.
            </p>
            <form action="#">
              <div className="field">
                <input
                  type="text"
                  required
                  value={this.state.q}
                  onChange={this.findCourseHandler}
                />
                <label>Search for courses</label>
              </div>
            </form>
          </div>
        </div>
        <div className="courses-section">
          <div className="open-course">
            <h1>Classes</h1>
            <Carousel
              show={5}
              children={filterd_courses.map((course) => {
                if (course.status === "new") {
                  return (
                    <div>
                      <Card
                        id={course.id}
                        title={course.name}
                        description={course.description}
                        teacher={course.teacher_name}
                        price={course.fee}
                        img={course.img}
                      />
                    </div>
                  );
                }
              })}
            />
          </div>
          <div className="open-course">
            <h1>In progress</h1>
            <Carousel
              show={5}
              children={this.state.courses.map((course) => {
                if (course.status === "ongoing") {
                  return (
                    <div>
                      <Card
                        id={course.id}
                        title={course.name}
                        description={course.description}
                        teacher={course.teacher_name}
                        price={course.fee}
                        img={course.img}
                      />
                    </div>
                  );
                }
              })}
            />
          </div>
          <div className="open-course">
            <h1>Finished</h1>
            <Carousel
              show={5}
              children={this.state.courses.map((course) => {
                if (course.status === "finished") {
                  return (
                    <div>
                      <Card
                        id={course.id}
                        title={course.name}
                        description={course.description}
                        teacher={course.teacher_name}
                        price={course.fee}
                        img={course.img}
                      />
                    </div>
                  );
                }
              })}
            />
          </div>

          <Link to="/admin/manage/courses/new-course">
            <i class="fas fa-plus-circle fa-4x"></i>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default CourseManagement;
