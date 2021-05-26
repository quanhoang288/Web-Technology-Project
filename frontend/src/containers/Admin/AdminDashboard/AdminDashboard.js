import React, { Component } from "react";
import "./AdminDashboard.css";
import Notiboard from "../../../components/Notiboard/Notiboard";
import StatCard from "../../../components/Card/StatCard";
import Button from "../../../components/Button/Button";
import { HOST_URL } from "../../../config";
export class Dashboard extends Component {
  state = {
    noti_data: [],
    revenue: 0,
    num_students: 0, 
    num_teachers: 0, 
    num_courses: 0 
  };
  ref = React.createRef();
  addNotificationHandler = () => {
    var slug = 'system_notifications'
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const time_created = new Date(Date.now() - tzoffset).toISOString();
    const date = time_created.split('T')[0];
    const time = time_created.split('T')[1].split('.')[0]

    var raw = JSON.stringify({ content: this.ref.current.value,created_at: date + ' ' + time});
    console.log(raw)
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${HOST_URL}/${slug}`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.fetch_noti())
      .catch((error) => console.log("error", error));
  };
  
 
  fetch_noti(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${HOST_URL}/system_notifications`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({noti_data:result}))
      .catch((error) => console.log("error", error));
    fetch(`${HOST_URL}/courses?stats=all`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({revenue: parseInt(result.revenue), num_courses: parseInt(result.num_courses)});
      })
    fetch(`${HOST_URL}/users?stats=all`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      this.setState({num_students: parseInt(result.student), num_teachers: parseInt(result.teacher)});
    })
  }
  componentDidMount() {
    this.fetch_noti()
  }

  render() {
    const stats = [
      { title: "Revenue", content: this.state.revenue },
      { title: "Teacher", content: this.state.num_teachers },
      { title: "Student", content: this.state.num_students },
      { title: "Course", content: this.state.num_courses }
    ];

    return (
      <div className="dashboard">
        <div className="title">Dashboard</div>
        <div className="statistics">
          {stats.map((item, idx) => {
            return <StatCard title={item.title} content={item.content} />;
          })}
        </div>

        <div className="notiboards">
          <Notiboard data={this.state.noti_data} rowPerPage={2}></Notiboard>
          <div className="create-plan">
            <h1>Update plan</h1>
            <hr></hr>
            <textarea ref={this.ref}></textarea>
            <Button onClick={this.addNotificationHandler}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
