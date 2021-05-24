import React, { Component } from "react";
import Card from '../../../components/Card/Card'
import Carousel from '../../../components/Carousel/Carousel'
import img from '../../../asset/eclass.png'
import {Link } from 'react-router-dom'
import {HOST_URL} from '../../../config'
import { connect } from 'react-redux';
export class TeacherCourse extends Component {
  state = {
    courses: [],
    q:"",
  };
    fetch_data() {
      const id = this.props.user.id;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${HOST_URL}/courses?user_id=${id}&role=teacher`, requestOptions)
        .then((response) => response.json())
        .then((result) => this.setState({courses: result}))
        .catch((error) => console.log("error", error));
    }
    findCourseHandler = (e) => {
      this.setState({ q: e.target.value });
    };
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
       
          
          if (course[q_keys[i]].toLowerCase().indexOf(this.state.q.toLowerCase()) >= 0 ) {
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
    const courses = this.queryCourse(['name','subject','teacher_name'])
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
            <h1>New Assigned</h1>
            <Carousel
              show={5}
              children={courses.map((course) => {
                if (course.status === "new") {
                  return (
                    <div>
                      <Card
                        id={course.id}
                        title={course.name}
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
              children={courses.map((course) => {
                if (course.status === "ongoing") {
                  return (
                    <div>
                      <Card
                        id={course.id}
                        title={course.name}

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
              children={courses.map((course) => {
                if (course.status === "finished") {
                  return (
                    <div>
                      <Card
                        id={course.id}
                        title={course.name}
                        img={course.img}
                      />
                    </div>
                  );
                }
              })}
            />
          </div>
          

          
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return (
      {
          user: state.authReducer.user
      }
  )
}
export default connect(mapState, null)(TeacherCourse);

