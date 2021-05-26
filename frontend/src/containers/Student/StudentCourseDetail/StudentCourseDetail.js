import React, { Component } from "react";
import "./StudentCourseDetail.css";
// import img from '../../../asset/eclass.png'
import Table from "../../../components/Table/Table";
import MOCK_DATA from "../../../components/Table/MOCK.json";
import InputField from "../../../components/InputField/InputField";
import Button from '../../../components/Button/Button'
import { Link } from "react-router-dom";
import { HOST_URL } from '../../../config';
import { connect } from 'react-redux';
import Backdrop from "../../../components/Backdrop/Backdrop";
import PopUp from "../../../components/PopUp/PopUp";

export class StudentCourseDetail extends Component {
  state = {
    id: this.props.match.params.id, // class id
	  enrolled : 0,  // 0 - not ; 1 - pending ; 2 -enrolled
    class_info : null,
    toogleState: 1,
    schedule: [],
    class_notification_list: [],
    class_material_list: [],
    class_exam_list: [],
	  class_student_list: [],
    status: null,
  };
  toggleTab = (index) => {
    this.setState({ toogleState: index });
  };
  int_to_time = (schedule_item) => {
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
    
    var res = {};
    res['weekday'] = weekday[schedule_item.weekday_id - 2];
    res['time'] = shift_option[schedule_item.time_id].duration;
    return res;

  }
  fetch_data = () => {
    // api call

    const user_id = this.props.user['id'];
    

    this.fetch_class_info();
    this.fetch_class_schedule();
    this.fetch_class_notifications();
    this.fetch_class_material();
    this.fetch_enroll_status(user_id);
    this.fetch_class_exams(user_id);
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    // };
    // fetch(`${HOST_URL}/courses/${this.state.id}`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //       this.setState({
    //         class_info: result
    //       });
    //   })
    //   .catch((error) => console.log("error", error)); 
    
 

    // fetch(`${HOST_URL}/schedule?course_id=${this.state.id}`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
          
    //       this.setState({schedule: result});
    //   })
    //   .catch((error) => console.log("error", error)); 

    // fetch(`${HOST_URL}/enroll?student_id=${user_id}&course_id=${this.state.id}`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result.length > 0){
    //         const enrolled = parseInt(result[0]['status']);
    //       	this.setState({enrolled:  enrolled});
    //     }
		//   })
    //   .catch((error) => console.log("error", error)); 
    // // fetch material list
    // fetch(`${HOST_URL}/documents?course_id=${this.state.id}`, requestOptions)
    // .then((response) => response.json())
    // .then((result) => {
    //     this.setState({
    //       class_material_list: result
    //     });
    // })
    // .catch((error) => console.log("error", error));  

    // // fetch exam list
    // fetch(`${HOST_URL}/exams?course_id=${this.state.id}&student_id=${user_id}`, requestOptions)
    // .then((response) => response.json())
    // .then((result) => {
    //     console.log(result);
    //     this.setState({
    //       class_exam_list: result.map(exam_info => ({created_at: exam_info.exam.created_at, taskname: exam_info.exam.taskname, score: exam_info.score}))
    //     });
    // })
    // .catch((error) => console.log("error", error));  


  }

  fetch_class_info = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/courses/${this.state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          this.setState({
            class_info: result
          });
      })
      .catch((error) => console.log("error", error)); 
  }

  fetch_class_notifications = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/course_notifications?course_id=${this.state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          this.setState({
            class_notification_list: result
          });
      })
      .catch((error) => console.log("error", error)); 
  }
  fetch_class_schedule = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/schedule?course_id=${this.state.id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        
        this.setState({schedule: result});
    })
    .catch((error) => console.log("error", error)); 
  }
  fetch_enroll_status = (user_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/enroll?student_id=${user_id}&course_id=${this.state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 0){
            const enrolled = parseInt(result[0]['status']);
          	this.setState({enrolled:  enrolled});
        }
		  })
      .catch((error) => console.log("error", error)); 
  }

  fetch_class_exams = (user_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/exams?course_id=${this.state.id}&student_id=${user_id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        this.setState({
          class_exam_list: result.map(exam_info => ({created_at: exam_info.exam.created_at, taskname: exam_info.exam.taskname, score: exam_info.score}))
        });
    })
    .catch((error) => console.log("error", error));  
  }

  fetch_class_material = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/documents?course_id=${this.state.id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        this.setState({
          class_material_list: result
        });
    })
  }
  downloadMaterialRequest = (id, filename) => {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      
      redirect: "follow",
    };

    fetch(
      `${HOST_URL}/documents/${id}`,
      requestOptions
    )
      .then((response) => response.blob())
      .then((blob) => {
        var objectURL = window.URL.createObjectURL(blob); 
        // console.log(objectURL);
        this.setState({obj:objectURL}) 
        const link = document.createElement('a');
        link.href = objectURL;
        link.setAttribute('download',filename); 
        document.body.appendChild(link);
        link.click();
                
                
    })
      .catch((error) => console.log("error", error));
  }

  

  	handleEnrollRequest = ()=>{
	  
		let enrolled = this.state.enrolled;
		const course_id = this.state.class_info['id'];
		const user_id = this.props.user['id'];
    const course_schedule = this.state.schedule.map(item => (JSON.stringify({weekday_id: item.weekday_id, time_id: item.time_id})));
    var conflict = false;
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: 'follow',
      };
      fetch(`${HOST_URL}/schedule?user_id=${user_id}&role=student&type=both`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const mapped_result = result.map(item => (JSON.stringify({weekday_id: item.weekday_id, time_id: item.time_id})));
        // console.log(mapped_result);
        // console.log(course_schedule);
        // console.log(mapped_result[2])
        // console.log(course_schedule[1])
        // console.log(JSON.stringify(mapped_result[2]) == JSON.stringify(course_schedule[1]))
        const intersect = mapped_result.filter(schedule_item => course_schedule.includes(schedule_item));
        // console.log(intersect);
        if (intersect.length === 0){
          if (enrolled === 0){
            const raw = JSON.stringify({
              student_id: user_id, course_id: course_id
            });
            // console.log(raw);
            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
              };
            fetch(`${HOST_URL}/enroll`, requestOptions)
            .then((response) => this.setState({enrolled:  1}))
            .catch((error) => console.log("error", error));   
          }
          else {
            var requestOptions = {
              method: "DELETE",
              headers: myHeaders,
              redirect: 'follow',
              };
              fetch(`${HOST_URL}/enroll?student_id=${user_id}&course_id=${this.state.id}`, requestOptions)
              .then((response) => this.setState({enrolled:  0}))
              .catch((error) => console.log("error", error)); 
          }
        }
        else{
          const newStatus = {code:400, msg: 'Schedule conflict'};
          this.setState({status:newStatus});
        }
      })
      .catch((error) => console.log("error", error));  

      
    

		

		
  	}
  	componentDidMount(){
      this.fetch_data();
  	}

  render() {
    const toggleState = this.state.toogleState;
    const enrolled = this.state.enrolled;
    const schedule = this.state.schedule.map((schedule_item) => this.int_to_time(schedule_item));
    const material_list = this.state.class_material_list;
    const notification_list = this.state.class_notification_list;
    const exams =  this.state.class_exam_list;
    // console.log(exams);
    if(this.state.class_info)
    {
      const class_info = this.state.class_info;
      
      // const notifications = class_info.notifications;
      
      // console.log(class_info);
      if(enrolled === 2 && class_info.status === 'ongoing')
      {
          return (
              
              <div>
                
                <div className="bloc-tabs">
                  <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => this.toggleTab(1)}
                  >
                    General
                  </button>
                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => this.toggleTab(2)}
                  >
                    Material
                  </button>
                  <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => this.toggleTab(3)}
                  >
                    Mark
                  </button>
                  
                </div>
        
                <div className="content-tabs">
                  <div // tab notification
                    className={
                      toggleState === 1 ? "contents  active-content" : "contents"
                    }
                  >
                    {
                      notification_list.map((noti) => 
                        <div className="plan-item">
                          <div className="datetime">{noti.create_at}</div>
                            <div className="content">
                                <p>{noti.content}</p>
                              
                            </div>
                        
                        </div>
                      )
                    }
                  </div>
        
                  <div //tab material
                    className={
                      toggleState === 2 ? "contents  active-content" : "contents"
                    }
                  >
                    {/* <div className="material"> */}
                    {material_list.map((material) => 
                      <div className="plan-item">
                        <div className="datetime">{material.time_created}</div>
                        <div className="content">
                            <Link to="#">
                            <div onClick={() => this.downloadMaterialRequest(material.id, material.filename)}>{material.filename}</div>
                            </Link>
                        </div>
                        
                      </div>
                    )}
                    {/* </div> */}
                  </div>
                  <div //tab mark
                    className={
                      toggleState === 3 ? "contents  active-content" : "contents"
                    }
                  >
                    <div className="mark">
                      
                    {exams.length > 0 ? (
                      <Table
                        rowPerPage={Math.min(5, exams.length)}
                        data={exams}
                      ></Table>) : ("")
                    }
                    </div>
                  </div>
        
                  
                </div>
              </div>
            );
      }
      return(
          <div className='student__course__detail'>
          {this.state.status  && Object.keys(this.state.status).includes('code') ? (
          <React.Fragment>
            <PopUp
              show={this.state.status ? true : false}
              closeHandler={() => this.setState({ status: null })}
              msg={this.state.status}
              redirect={() => this.setState({ status: null })}
            ></PopUp>
            <Backdrop
              toggleBackdrop={() => this.setState({ status: null })}
            ></Backdrop>
          </React.Fragment>
        ) : null}
        {
          class_info ? 
          <>
           <div className="scd_overview"> 
            <h1> {class_info.name} </h1>
            <p style={{"width":"50%","fontSize":"2em"}}>{class_info.description}</p> 
            <h2>Teacher: {class_info.teacher_name}</h2>
            <h2>Schedule</h2>
            <ul>
              {schedule.length > 0 ? schedule.map((item)=><p>{item.weekday} - {item.time}</p>) : ''}
            </ul>
            </div>
          <div className='scd_enrol'> 
            <img src={class_info.img}></img>
            <h1>{class_info.fee}</h1>
            {enrolled === 0 ? <Button onClick={this.handleEnrollRequest}>Enrol</Button> :
             enrolled === 3 ? <Button>Unavailable</Button> :
             <Button onClick={this.handleEnrollRequest}>Pending</Button>}
          </div>
          </> : ''
        }
              
          </div>
      )
      
    }
    return null
    }

	
   
}

const mapState = (state) => {
    return (
        {
            user: state.authReducer.user
        }
    )
}
export default connect(mapState, null)(StudentCourseDetail);
