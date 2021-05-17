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
    courses: []
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
                <input type="text" required />
                <label>Search for courses</label>
              </div>
            </form>
          </div>
        </div>

        <Notiboard data={this.state.notifications} rowPerPage={3}></Notiboard>
        <div className="featuring-courses">
          <div className="open-course">
            <h1>Best seller</h1>
            <Carousel
              show={5}
              children={
                this.state.courses.map((course) => 
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
