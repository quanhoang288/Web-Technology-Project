import React, { Component } from "react";
import img from "../../asset/eclass.png";
import './HomePage.css'
import Notiboard from "../../components/Notiboard/Notiboard";
import MOCKDATA from "../../components/Notiboard/mock.json";
import { HOST_URL } from "../../config";
import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel";
export class HomePage extends Component {
  state = {
    notifications: [],
    courses: [],
    q:""
  };
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

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/system_notifications`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({notifications:result}))
      .catch((error) => console.log("error", error));

    fetch(`${HOST_URL}/courses?status=new`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({courses:result}))
      .catch((error) => console.log("error", error));
  }
  render() {
    const filterd_courses = this.queryCourse(['name','subject','teacher_name'])
    // console.log(filterd_courses)

    return (
      <div className="homepage">
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
                <input type="text" required value={this.state.q} onChange={this.findCourseHandler}/>
                <label>Search for courses</label>
              </div>
            </form>
          </div>
        </div>

        <Notiboard data={this.state.notifications} rowPerPage={3}></Notiboard>
        <div className="featuring-courses">
          <div className="open-course">
            <h1>New course</h1>
            <Carousel
              show={5}
              children={
                filterd_courses.map((course) => 
                <Card id={course.id} title={course.name} price={course.fee} teacher={course.teacher_name} img={course.img} />
                )
                }
            ></Carousel>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
