import React, { Component } from "react";
import "./StudentCourse.css";
import Card from "../../../components/Card/Card";
import Carousel from "../../../components/Carousel/Carousel";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { HOST_URL } from '../../../config';
import { connect } from 'react-redux';
export class StudentCourse extends Component {
  state={
    courses: []
  };
  fetch_data = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/courses?user_id=${this.props.user.id}&role=student`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({ courses: result}))
      .catch((error) => console.log("error", error));
  }
  componentDidMount(){
      this.fetch_data();
  }
  render() {
    const courses = this.state.courses;
    return (
      <div>
        <div className="enrol">
          <h1> Courses </h1>
          <Link to ='/student'>
            <Button>Enrol a new course</Button>
          </Link>
        </div>
        
        <div className="courses-section">
          <div className="open-course">
            <h1>Registering</h1>
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
      </div>
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
export default connect(mapState, null)(StudentCourse);
