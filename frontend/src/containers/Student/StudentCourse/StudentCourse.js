import React, { Component } from "react";
import "./StudentCourse.css";
import Card from "../../../components/Card/Card";
import Carousel from "../../../components/Carousel/Carousel";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
export class StudentCourse extends Component {
  render() {
    return (
      <div>
        <div className="enrol">
          <h1> Courses </h1>
          <Link to ='/student'>
            <Button>Enrol a new course</Button>
          </Link>
        </div>
        <div className="courses">
          <div>
            <Card id={1}></Card>
          </div>
          <div>
            <Card></Card>
          </div>

          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentCourse;
