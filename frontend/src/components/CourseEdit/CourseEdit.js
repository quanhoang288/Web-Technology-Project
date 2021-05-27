import React, { Component } from "react";
import InputField from "../InputField/InputField";
import ImageUploader from "../ImageUploader/ImageUploader";
import Dropdown from "../Dropdown/Dropdown";
import Backdrop from "../../components/Backdrop/Backdrop";
import PopUp from "../../components/PopUp/PopUp";
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
    sched: [],
    status: null,
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
        // console.log(result)
        this.setState({class_info: result});
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
        this.fetch_teachers(result.subject);
        this.fetch_schedule();
    })
    .catch((error) => console.log(error));
	
	}
  fetch_schedule = () => {
    var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
		  method: "GET",
		  headers: myHeaders,
		  redirect: "follow",
		};

    fetch(`${HOST_URL}/schedule?course_id=${this.state.id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => this.setState({sched: result}))
    .catch((error) => console.log(error));
    

  }
  fetch_teachers = (subject=null) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
		  method: "GET",
		  headers: myHeaders,
		  redirect: "follow",
		};
    if (subject){
      fetch(`${HOST_URL}/users?role=teacher&subject=${subject}`, requestOptions)
		  .then((response) => response.json())
		  .then((result) => this.setState({teachers: result}))
		  .catch((error) => console.log(error));
    }
    else{
      fetch(`${HOST_URL}/users?role=teacher`, requestOptions)
		  .then((response) => response.json())
		  .then((result) => this.setState({teachers: result}))
		  .catch((error) => console.log(error));
    }

  }
	componentDidMount(){
		this.fetch_data();
        
	}
  onSubmit = () => {
    

    const required_field = ['title',"description","price"]
    var missing_field = false
    required_field.forEach((field) => {
      // console.log(this.state[field].length);
      if(this.state[field].length === 0)
      {
   
        this.setState({status:{code:400, msg:"Fill all required field"}})
        missing_field = true
        return
      }
    })
    if(missing_field ||this.state.img === null) {
      this.setState({status:{code:400, msg:"Fill all required field"}})
      return
    }
 
    try{
      var raw_course = {
        name: this.state.title,
        fee: this.state.price,
        min: this.state.min, 
        max: this.state.max,
        teacher_id: this.state.teacher_option["id"],
        subject: this.state.subject_option["name"],
        level: this.state.level_option["name"],
        description: this.state.description,
        img: this.state.img,
      };
        
    
      }
    catch(err){
      this.setState({status:{code:400, msg:"Fill all required field"}})
      return
    }

    
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");  
		var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
		};
    // console.log(teacher_option);
    
    fetch(`${HOST_URL}/schedule?user_id=${this.state.teacher_option['id']}&role=teacher&type=both`, requestOptions)
		.then((response) =>{
      return response.json();
    })
		.then((result) => {
      const sched_stringify = this.state.sched ? this.state.sched.map(item => (JSON.stringify({weekday_id: parseInt(item.weekday_id), time_id: parseInt(item.time_id)}))) : [];
      console.log(result);
      console.log(this.state.sched);
      const mapped_result = result ? result.map(item => (JSON.stringify({weekday_id: parseInt(item.weekday_id), time_id: parseInt(item.time_id)}))) : [];
      const intersect = mapped_result.filter(schedule_item => sched_stringify.includes(schedule_item));
      // console.log(mapped_result);
      // console.log(sched_stringify);
      if (intersect.length === 0){
        // alert("No Conflict");
        myHeaders.append("Content-Type", "application/json");  
        myHeaders.append(
          "Authorization",
          `Bearer ${localStorage.getItem("token")}`
        );
        requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(raw_course),
        redirect: "follow",
        };
        fetch(`${HOST_URL}/courses/${this.state.id}`, requestOptions)
        .then((response) =>{
          var newStatus = {...this.state.status}
          newStatus.code = response.status
          this.setState({status:newStatus})
          return response.json()
        })
        .then((result) => {
          // console.log(result)
          var newStatus = {...this.state.status};
          newStatus.msg = result;
          this.setState({status:newStatus});
        })
        .catch((error) => console.log("error", error));
      }
      else{
        this.setState({status: {code: 400, msg: "Conflict in teacher schedule"}})

      }
    })
		.catch((error) => console.log("error", error));

		
	}
	

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

    
	const level_options = [{name:"Beginner"}, {name:"Intermidiate"}, {name:"Upper-Intermidiate"}, {name:"Advanced"}];
    return (
    <React.Fragment>
      {this.state.title ?
      <div className="course-create">
       {this.state.status ? (
          <React.Fragment>
            <PopUp
              show={this.state.status ? true : false}
              closeHandler={() => this.setState({ status: null })}
              msg={this.state.status}
              redirect={() => {
                window.location.href = "/admin/manage/courses";
              }}
            ></PopUp>
            <Backdrop
              toggleBackdrop={() => this.setState({ status: null })}
            ></Backdrop>
          </React.Fragment>
        ) : null}  
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
              this.fetch_teachers(option.name);
              this.setState({ subject_option: option });
            } else {
              this.setState({ subject_option: null });
            }
            this.setState({teacher_option:null})
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