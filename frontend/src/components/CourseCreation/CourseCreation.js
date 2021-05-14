import React, { Component } from "react";
import "./CourseCreation.css";
import InputField from "../InputField/InputField";
import ImageUploader from "../ImageUploader/ImageUploader";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
export class CourseCreation extends Component {
  state = {
    title: "",
    teacher_option: null,
    description: "",
    category: "",
    sched: [-1, -1, -1, -1, -1, -1, -1],
    img: "",
    price: "",
    category: "",
  };
  textarea_ref = React.createRef("");
  onSubmit = () => {
    console.log(this.state);
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
    const teacher_option = [
      {
        id: 1,
        name: "Mr Nguyen Duc Thang",
      },
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
            type="text"
            field="category"
            label="Catergory"
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
          <label>Description</label>
          <textarea
            ref={this.textarea_ref}
            onChange={() =>
              this.setState({ description: this.textarea_ref.current.value })
            }
          ></textarea>

          <Dropdown
            options={teacher_option}
            prompt="select teacher"
            value="Teacher"
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
                if (shift !==-1) {
                  
                  return (
                    <Dropdown
                      key={idx}
                      options={shift_option}
                      prompt={`Select Shift for ${weekday[idx]}`}
                      value={shift_option[shift]['duration']}
                      field="duration"
                      
                      onChange={(option) => {
                        var newSched = {...this.state}.sched
                        newSched[idx] = option['id']
                        this.setState({sched:newSched})
                      }}
                    ></Dropdown>
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
        </div>
      </div>
    );
  }
}

export default CourseCreation;
