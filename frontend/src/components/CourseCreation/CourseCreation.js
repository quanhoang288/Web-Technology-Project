import React, { Component } from "react";
import "./CourseCreation.css";
import InputField from "../InputField/InputField";
import ImageUploader from "../ImageUploader/ImageUploader";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
export class CourseCreation extends Component {
  state = {
    title: "",
    teacher_id: "",
    description: "",
    category:"",
    sched: { Monday: "", Tuesday: "" },
    img_path: "",
    price: "",
    category: "",
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
        id: 1,
        duration:'6h-9h'
      },
      {
        id:2 ,
        duration:'9h-12h'
      },
      {
        id: 3,
        duration:'12h-15h'
      },
      {
        id: 4,
        duration:'15h-18h'
      },
    ]

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
          <textarea></textarea>

          <Dropdown
            options={[
              {
                id: 1,
                weekday: "Sunday",
                
              },
            ]}
            prompt="select weekday"
            value="Teacher"
            field="weekday"
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
                      checked={this.state.sched[day] != null ? true : false}
                      onChange={(e) => {
                        let newState = { ...this.state };
                        if (this.state.sched[day] != null) {
                          delete newState.sched[day];
                        } else {
                          newState.sched[day] = "";
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
              {Object.keys(this.state.sched).map((weekday, idx) => {
                return (
                  <Dropdown
                    options={shift_option}
                    prompt={`Select Shift for ${weekday}`}
                    value={this.state.sched[weekday]}
                    field="duration"
                    value={this.state.sched[weekday]}
                    onChange={(option) => {
                      let sched = {...this.state.sched}
                      sched[weekday] = option
                      this.setState({sched:sched})
                      
                    }}

                  ></Dropdown>
                );
              })}
            </div>
          </div>
        </div>
        <div className="img-uploader">
          <ImageUploader></ImageUploader>
          <Button>Submit</Button>
        </div>
      </div>
    );
  }
}

export default CourseCreation;
