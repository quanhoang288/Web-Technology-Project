import React, { Component } from "react";
import Card from '../../../components/Card/Card'
import Carousel from '../../../components/Carousel/Carousel'
import img from '../../../asset/eclass.png'
import {Link } from 'react-router-dom'
export class TeacherCourse extends Component {
  state = {
    courses: [],
  };
  //   fetch_data() {
  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");

  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     fetch("http://localhost/webproject/api/users?role=student", requestOptions)
  //       .then((response) => response.text())
  //       .then((result) => console.log(result))
  //       .catch((error) => console.log("error", error));
  //   }

  componentDidMount() {}
  render() {
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
                  onChange={(e) => {
                    this.fieldOnChangeHandler("username", e);
                  }}
                />
                <label>Search for courses</label>
              </div>
            </form>
          </div>
        </div>
        <div className="courses-section">
          <div className="open-course">
            <h1>Courses</h1>
            <Carousel
              show={5}
              children={[
                <div>
                  <Card id={5}></Card>
                </div>,
                <div>
                  <Card></Card>
                </div>,
                <div>
                  <Card></Card>
                </div>,
                <div>
                  <Card></Card>
                </div>,
                <div>
                  <Card></Card>
                </div>,
                <div>
                  <Card></Card>
                </div>,
                <div>
                  <Card></Card>
                </div>,
              ]}
            ></Carousel>
          </div>
          

          
        </div>
      </React.Fragment>
    );
  }
}

export default TeacherCourse;
