import React, { Component } from "react";
import "./CourseCreation.css";
import InputField from "../InputField/InputField";
import ImageUploader from "../ImageUploader/ImageUploader";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import Backdrop from '../Backdrop/Backdrop'
import PopUp from '../PopUp/PopUp'
import { HOST_URL } from "../../config";
export class CourseCreation extends Component {
	state = {
		title: "",
		teachers: [],
		teacher_option: null,
		subject_option: null,
		level_option:null,
		min: 0,
		max: 0,
		description: "",
		category: "",
		sched: [0, -1, -1, -1, -1, -1, -1],
		img: "",
		price: "",
		category: "",
	};
	textarea_ref = React.createRef("");
	fetch_data = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
	
		var requestOptions = {
		  method: "GET",
		  headers: myHeaders,
		  redirect: "follow",
		};
	
		fetch(HOST_URL + "/users?role=teacher", requestOptions)
		  .then((response) => response.json())
		  .then((result) => this.setState({teachers: result}))
		  .catch((error) => console.log(error));
	}
	componentDidMount(){
		this.fetch_data();
	}
	process_sched(sched) {
		var process_sched = [];
		sched.forEach((item, index) => {
		if (item !== -1) {
			process_sched.push({ weekday_id: index + 2, time_id: item });
		}
		});
		return process_sched;
	}
	onSubmit = () => {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const time_created = new Date(Date.now() - tzoffset).toISOString();
    const date = time_created.split('T')[0];
    const time = time_created.split('T')[1].split('.')[0]
		var { title, teacher_option, subject_option, level_option, min, max, description, sched, img, price } =
		this.state;
		var raw_course = {
		name: title,
		fee: price,
		min: min, 
		max: max,
		teacher_id: teacher_option["id"],
		subject: subject_option["name"],
		level: level_option["name"],
		description: description,
		img: img,
    time_created: date + ' ' + time
		};
		var raw_sched = this.process_sched(sched);
		var raw = JSON.stringify({
		course: raw_course, 
		schedule: raw_sched
		});
		
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");  
		var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
		};
		fetch(`${HOST_URL}/courses`, requestOptions)
		.then((response) =>{
      console.log(response.status);
      response.text();
    })
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
	};
  render() {
    const weekday = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const shift_option = [
      {
        id: 0,
        duration: "6h-9h",
      },
      {
        id: 1,
        duration: "9h-12h",
      },
      {
        id: 2,
        duration: "12h-15h",
      },
      {
        id: 3,
        duration: "15h-18h",
      },
    ];

    const teacher_option = this.state.teachers;
    const subject_option = [
      { name: "English" },
      { name: "Math" },
      { name: "Literature" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Biology" },
      { name: "History" },
      { name: "Geography" },
    ];
    const level_options = [
      { name: "Beginner" },
      { name: "Intermidiate" },
      { name: "Upper-Intermidiate" },
      { name: "Advanced" },
    ];
    return (
      <div className="course-create">
        <div className="course-create-form">
          <InputField
            type="text"
            field="title"
            label="Course title"
            onChange={(field, input) => {
              this.setState({ [`${field}`]: input });
            }}
          ></InputField>
          <InputField
            type="number"
            field="price"
            label="Price - in $"
            onChange={(field, input) => {
              this.setState({ [`${field}`]: input });
            }}
          ></InputField>
          <InputField
            type="number"
            field="min"
            label="Min number of students"
            onChange={(field, input) => {
              this.setState({ [`${field}`]: input });
            }}
          ></InputField>
          <InputField
            type="number"
            field="max"
            label="Max number of students"
            onChange={(field, input) => {
              this.setState({ [`${field}`]: input });
            }}
          ></InputField>
          <Dropdown
            options={subject_option}
            prompt="Choose a subject"
            value="subject"
            field="name"
            value={
              this.state.subject_option
                ? this.state.subject_option["name"]
                : null
            }
            onChange={(option) => {
              if (option) {
                this.setState({ subject_option: option });
              } else {
                this.setState({ subject_option: null });
              }
            }}
          ></Dropdown>
          <Dropdown
            options={level_options}
            prompt="Choose a level"
            value="level"
            field="name"
            value={
              this.state.level_option ? this.state.level_option["name"] : null
            }
            onChange={(option) => {
              if (option) {
                this.setState({ level_option: option });
              } else {
                this.setState({ level_option: null });
              }
            }}
          ></Dropdown>
          <Dropdown
            options={teacher_option}
            prompt="Choose a teacher"
            field="name"
            value={
              this.state.teacher_option
                ? this.state.teacher_option["name"]
                : null
            }
            onChange={(option) => {
              if (option) {
                this.setState({ teacher_option: option });
              } else {
                this.setState({ teacher_option: null });
              }
            }}
          ></Dropdown>
          <label>Description</label>
          <textarea
            ref={this.textarea_ref}
            onChange={() =>
              this.setState({ description: this.textarea_ref.current.value })
            }
          ></textarea>

          <div className="schedule">
            <div className="checkboxes">
              {weekday.map((day, idx) => {
                return (
                  <div>
                    <input
                      id={idx}
                      key={idx}
                      type="checkbox"
                      checked={this.state.sched[idx] !== -1 ? true : false}
                      onChange={(e) => {
                        let newState = { ...this.state };
                        if (this.state.sched[idx] !== -1) {
                          newState.sched[idx] = -1;
                        } else {
                          newState.sched[idx] = 0;
                        }
                        this.setState(newState);
                      }}
                    />
                    <label htmlFor={idx}>{day}</label>
                  </div>
                );
              })}
            </div>

            <div className="time-picker">
              {this.state.sched.map((shift, idx) => {
                if (shift !== -1) {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <label> {`Select Shift for ${weekday[idx]}`} </label>
                      <Dropdown
                        key={idx}
                        options={shift_option}
                        prompt={`Select Shift for ${weekday[idx]}`}
                        value={shift_option[shift]["duration"]}
                        field="duration"
                        onChange={(option) => {
                          var newSched = { ...this.state }.sched;
                          newSched[idx] = option["id"];
                          this.setState({ sched: newSched });
                        }}
                      ></Dropdown>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="img-uploader">
          <ImageUploader
            onChange={(img) => {
              var prevState = { ...this.state };
              prevState.img = img;
              this.setState(prevState);
            }}
          ></ImageUploader>
          <Button onClick={this.onSubmit}>Submit</Button>
          {
            this.state.statusPopUp ? 
            <React.Fragment>
              <PopUp 
              show={this.state.statusPopUp ? true : false}
              closeHandler = {() => this.setState({statusPopUp:null})}
              msg = {this.state.statusPopUp}
              redirect = {() => {this.props.history.push('/admin/manage/courses')}}
            >
            </PopUp>
            <Backdrop toggleBackdrop = {()=>this.setState({statusPopUp:null})}></Backdrop>
            </React.Fragment>
            
            : null
          }
        </div>
        
      </div>
    );
  }
}
export default CourseCreation;
