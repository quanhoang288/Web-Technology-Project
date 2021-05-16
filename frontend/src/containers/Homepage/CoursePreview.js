import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from '../../asset/eclass.png'
import Button from '../../components/Button/Button'
export class CoursePreview extends Component {
  render() {
    return (
      <div>
        <div className="student__course__detail">
          <div className="scd_overview">
            <h1> Title </h1>
            <p>Description</p>
            <h2>Teacher</h2>
          </div>
          <div className="scd_enrol">
            <img src={img}></img>
            <h1>$99</h1>
            
            <Link to='/login'>
            <Button>Enrol</Button>
            </Link>
            
          </div>
        </div>
      </div>
    );
  }
}

export default CoursePreview;
