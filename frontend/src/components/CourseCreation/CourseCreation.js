import React, { Component } from "react";
import "./CourseCreation.css";
import InputField from "../InputField/InputField";
import ImageUploader from "../ImageUploader/ImageUploader";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button"
export class CourseCreation extends Component {
  state = {
    title: "",
    teacher_id: "",
    description: "",
    sched: "",
    img_path: "",
    price: "",
    category: "",
  };
  render() {
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
            label="Price"
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
                id: 2,
                weekday: "Monday",
                id: 3,
                weekday: "Tuesday",
              },
            ]}
            prompt="select weekday"
            value="Teacher"
            field="weekday"
          ></Dropdown>

          <div className="schedule">
            
            <Dropdown
              options={[
                {
                  id: 1,
                  weekday: "Sunday",
                  id: 2,
                  weekday: "Monday",
                  id: 3,
                  weekday: "Tuesday",
                },
              ]}
              prompt="select weekday"
              value=""
              field="weekday"
            ></Dropdown>
            <Dropdown
              options={[
                {
                  id: 1,
                  weekday: "Sunday",
                  id: 2,
                  weekday: "Monday",
                  id: 3,
                  weekday: "Tuesday",
                },
              ]}
              prompt="select weekday"
              value=""
              field="weekday"
            ></Dropdown>
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
