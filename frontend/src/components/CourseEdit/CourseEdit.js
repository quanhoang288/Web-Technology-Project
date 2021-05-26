import React, { Component } from "react";
import InputField from "../InputField/InputField";
import ImageUploader from "../ImageUploader/ImageUploader";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import { HOST_URL } from "../../config";
export class CourseEdit extends Component {
	state = {
    id: this.props.match.params.id,
		title: "",
		teachers: [],
		teacher_option: null,
		subject_option: null,
		level_option:null,
		min: 0,
		max: 0,
		description: "",
		category: "",
		img: "",
		price: "",
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
        fetch(`${HOST_URL}/courses/${this.state.id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            this.setState({
                title: result.name,
                teacher_option: {id: result.teacher_id, name: result.teacher_name},
                subject_option: {name: result.subject},
                level_option: {name: result.level},
                img:result.img,
                min: result.min,
                max: result.max,
                description: result.description,
                category: result.subject, 
                price: result.fee

            })
        })
        .catch((error) => console.log(error));
	
		fetch(HOST_URL + "/users?role=teacher", requestOptions)
		  .then((response) => response.json())
		  .then((result) => this.setState({teachers: result}))
		  .catch((error) => console.log(error));
	}
	componentDidMount(){
		this.fetch_data();
        
	}
	
	onSubmit = () => {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const time_created = new Date(Date.now() - tzoffset).toISOString();
    const date = time_created.split('T')[0];
    const time = time_created.split('T')[1].split('.')[0]
		var { title, teacher_option, subject_option, level_option, min, max, description,  img, price } =
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
		

		
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");  
		var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: JSON.stringify(raw_course),
		redirect: "follow",
		};
		fetch(`${HOST_URL}/courses/${this.state.id}`, requestOptions)
		.then((response) =>{
      console.log(response.status);
      response.text();
    })
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
	};
  render() {
	const teacher_option = this.state.teachers;
	const subject_option = [
		{name: "English"},
		{name: "Math"},
		{name: "Literature"},
		{name: "Physics"},
		{name: "Chemistry"},
		{name: "Biology"},
		{name: "History"},
		{name: "Geography"},
	];

    console.log(this.state.title);
	const level_options = [{name:"Beginner"}, {name:"Intermidiate"}, {name:"Upper-Intermidiate"}, {name:"Advanced"}];
    return (
    <React.Fragment>
      {this.state.title ?
      <div className="course-create">
      <div className="course-create-form">
        <InputField
          type="text"
          field="title"
          label="Course title"
          value = {this.state.title}
          onChange={(field, input) => {
            this.setState({ [`${field}`]: input });
          }}
        ></InputField>
  <InputField
          type="text"
          field="price"
          label="Price - in $"
          value = {this.state.price}
          onChange={(field, input) => {
            this.setState({ [`${field}`]: input });
          }}
        ></InputField>
      <InputField
          type="text"
          field="min"
          label="Min number of students"
          value = {this.state.min}
          onChange={(field, input) => {
            
            this.setState({ [`${field}`]: input });
          }}
        ></InputField>
  <InputField
          type="number"
          field="max"
          label="Max number of students"
          value = {this.state.max}
          onChange={(field, input) => {
            this.setState({ [`${field}`]: input });
          }}
        ></InputField>
  <Dropdown
          options={subject_option}
          prompt="Choose a subject"
       
          field="name"
          value={
            this.state.subject_option
              ? this.state.subject_option['name']
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
            this.state.level_option
              ? this.state.level_option['name']
              : null
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
          value={this.state.description}
          onChange={() =>
            this.setState({ description: this.textarea_ref.current.value })
          }
        ></textarea>

      </div>
      <div className="img-uploader">
        <ImageUploader
          preview = {this.state.img}
          onChange={(img) => {
            var prevState = { ...this.state };
            prevState.img = img;
            this.setState(prevState);
          }}
        ></ImageUploader>
        <Button onClick={this.onSubmit}>Update</Button>
      </div>
    </div> : null }
    </React.Fragment>  
      
    );
  }
}
export default CourseEdit;