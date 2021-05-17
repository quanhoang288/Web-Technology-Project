import React, { Component } from "react";
import "./StudentCourseDetail.css";
import img from '../../../asset/eclass.png'
import Table from "../../../components/Table/Table";
import MOCK_DATA from "../../../components/Table/MOCK.json";
import InputField from "../../../components/InputField/InputField";
import Button from '../../../components/Button/Button'
import { Link } from "react-router-dom";
import { HOST_URL } from '../../../config';
import { connect } from 'react-redux';
export class StudentCourseDetail extends Component {
  state = {
    id: this.props.match.params.id, // class id
	  enrolled : 0,  // 0 - not ; 1 - pending ; 2 -enrolled
    class_info : null,
    toogleState: 1,
    class_notification_list: [],
    class_material_list: [],
	class_student_list: []
  };
  toggleTab = (index) => {
    this.setState({ toogleState: index });
  };
  fetch_data = () => {
    // api call
	// console.log(this.props.user.id);
	const user_id = this.props.user['id'];
	
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${HOST_URL}/courses/${this.state.id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        this.setState({class_info: result});
    })
    .catch((error) => console.log("error", error)); 

    fetch(`${HOST_URL}/enroll?student_id=${user_id}&course_id=${this.state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 0){
          	this.setState({enrolled:  parseInt(result[0]['status'])});
        }
		})
      .catch((error) => console.log("error", error)); 



  };

  

  	handleEnrollRequest = ()=>{
	  
		let enrolled = this.state.enrolled;
		const course_id = this.state.class_info['id'];
		const user_id = this.props.user['id'];
		var myHeaders = new Headers();

		myHeaders.append("Content-Type", "application/json");
		if (enrolled === 0){
			const raw = JSON.stringify({
				student_id: user_id, course_id: course_id
			});
			console.log(raw);
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
  	componentDidMount(){
      this.fetch_data();
  	}

  render() {
    const toggleState = this.state.toogleState;
    const enrolled = this.state.enrolled;
	
    if(this.state.class_info)
    {
      const class_info = this.state.class_info
      if(enrolled === 2 )
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
                    
        
                    <div className="plan-item">
                      <div className="datetime">2020-05</div>
                      <div className="content">
                        <Link to="#">
                          <p>HJjhdgasjhdjhgsajhgdjh</p>
                        </Link>
                      </div>
                      
                    </div>
                    <div className="plan-item">
                      <div className="datetime">2020-05</div>
                      <div className="content">
                        <Link to="#">
                          <p>De bai 1 : mieu ta 1 con cho</p>
                        </Link>
                      </div>
                      <i class="fas fa-edit"></i>
                    </div>
                  </div>
        
                  <div //tab material
                    className={
                      toggleState === 2 ? "contents  active-content" : "contents"
                    }
                  >
                    <div className="material">
                      
                      <div className="plan-item">
                        <div className="datetime">2020-05</div>
                        <div className="content">
                          <Link to="#">
                            <p>De bai 1 : mieu ta 1 con cho</p>
                          </Link>
                        </div>
                        <div className="datetime">Deadline 2020-05</div>
                      </div>
                    </div>
                  </div>
                  <div //tab mark
                    className={
                      toggleState === 3 ? "contents  active-content" : "contents"
                    }
                  >
                    <div className="mark">
                      
                      <p>Mark</p>
                    </div>
                  </div>
        
                  
                </div>
              </div>
            );
      }
      return(
          <div className='student__course__detail'>
        {
          class_info ? 
          <>
           <div className="scd_overview"> 
            <h1> {class_info.name} </h1>
            <p style={{"width":"50%","fontSize":"2em"}}>{class_info.description}</p>
            
                  <h2>{class_info.teacher_name}</h2>
                 </div>
          <div className='scd_enrol'> 
            <img src={class_info.img}></img>
            <h1>{class_info.fee}</h1>
            {enrolled === 0 ? <Button onClick={this.handleEnrollRequest}>Enrol</Button> : <Button onClick={this.handleEnrollRequest}>Pending</Button>}
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
