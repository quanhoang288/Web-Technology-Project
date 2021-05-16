import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "../../asset/eclass.png";
import Button from "../../components/Button/Button";
export class CoursePreview extends Component {
  state = {
    id: this.props.match.params.id, // class id
    class_info: {
      x: "",
    },
  };
  fetch_data = () => {};
  componentDidMount() {}
  render() {
    return (
      <div>
        {this.state.class_info ? (
          <div className="student__course__detail">
            <div className="scd_overview">
              <h1> Title </h1>
              <p style={{ width: "50%", fontSize: "2em" }}>
                Spring Framework 5: Learn Spring Framework 5, Spring Boot 2,
                Spring MVC, Spring Data JPA, Spring Data MongoDB, Hibernate
              </p>
              <p style={{ fontSize: "1.5em" }}>Rating </p>
              <h2>Teacher</h2>
            </div>
            <div className="scd_enrol">
              <img src={img}></img>
              <h1>$99.44</h1>
              <Link to="/login">
                <Button>Enrol</Button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CoursePreview;
