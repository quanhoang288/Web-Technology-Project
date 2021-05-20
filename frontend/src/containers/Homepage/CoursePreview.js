import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "../../asset/eclass.png";
import Button from "../../components/Button/Button";
import {HOST_URL} from "../../config";
export class CoursePreview extends Component {
  state = {
    id: this.props.match.params.id, // class id
    class_info: null,
  };
  fetch_data = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/courses/${this.state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          this.setState({class_info: result});
      })
      .catch((error) => console.log("error", error)); 
  };
  componentDidMount() {
    this.fetch_data();
  }
  render() {
    const class_info = this.state.class_info;
    return (
      <div>
        {class_info ? (
          <div className="student__course__detail">
            <div className="scd_overview">
              <h1> {class_info.name} </h1>

              {/* <p style={{ fontSize: "1.5em" }}>Rating </p> */}
              <h2>Teacher: {class_info.teacher_name}</h2>
              <p style={{ width: "50%", fontSize: "2em" }}>
                {class_info.description}
              </p>
            </div>
            <div className="scd_enrol">
              <img src={class_info.img}></img>
              <h1>{class_info.fee}</h1>
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
