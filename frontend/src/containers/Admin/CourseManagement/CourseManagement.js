import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseManagement.css";
import Carousel from "../../../components/Carousel/Carousel";
import Card from "../../../components/Card/Card";
import img from "../../../asset/eclass.png";
import "./CourseManagement.css";
import {HOST_URL} from '../../../config';
export class CourseManagement extends Component {
  state = {
    courses: [],
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
      .then((result) => this.setState({courses: result}))
      .catch((error) => console.log("error", error));
  	}

  componentDidMount() {
    this.fetch_data();
  }
  render() {
	console.log(this.state.courses);
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
            <h1>Course registration now open online</h1>
            <Carousel
              show={5}
              children={
                this.state.courses.map((course)=>{
					if (course.status === 'new'){
						return <div><Card id={course.id} title={course.name} description={course.description} teacher={course.teacher_name} price={course.fee} img={course.img}/></div>
					}
				}
					
				)
                }
            />
          </div>
          <div className="open-course">
            <h1>In progress</h1>
			<Carousel
              show={5}
              children={
                this.state.courses.map((course)=>{
					if (course.status === 'ongoing'){
						return <div><Card id={course.id} title={course.name} description={course.description} teacher={course.teacher_name} price={course.fee} img={course.img}/></div>
					}
				}
					
				)
                }
            />
          </div>
		  <div className="open-course">
            <h1>Finished</h1>
			<Carousel
              show={5}
              children={
                this.state.courses.map((course)=>{
					if (course.status === 'finished'){
						return <div><Card id={course.id} title={course.name} description={course.description} teacher={course.teacher_name} price={course.fee} img={course.img}/></div>
					}
				}
					
				)
                }
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
