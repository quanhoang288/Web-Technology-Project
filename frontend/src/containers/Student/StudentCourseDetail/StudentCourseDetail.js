import React, { Component } from "react";
import "./StudentCourseDetail.css";
import img from '../../../asset/eclass.png'
import Table from "../../../components/Table/Table";
import MOCK_DATA from "../../../components/Table/MOCK.json";
import InputField from "../../../components/InputField/InputField";
import Button from '../../../components/Button/Button'
import { Link } from "react-router-dom";
export class StudentCourseDetail extends Component {
  state = {
    id: this.props.match.params.id, // class id
    class_info : {
        enrolled : false,
        description : "Hello this is the best class",
        teacher_name: '',
        img:"",
    },
    toogleState: 1,
    class_notification_list: [],
    class_material_list: [],
  };
  toggleTab = (index) => {
    this.setState({ toogleState: index });
  };
  fetch_data = () => {
    // api call 



  };
  render() {
    let toggleState = this.state.toogleState;
    let enrolled = this.state.class_info.enrolled
    if(enrolled)
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
      
                
              </div>
            </div>
          );
    }
    return(
        <div className='student__course__detail'>
            <div className="scd_overview"> 
                <h1> Title </h1>
                <p>Description</p>
                <h2>Teacher</h2>
             </div>
            <div className='scd_enrol'> 
                <img src={img}></img>
                <h1>$99</h1>
                <Button>Enrol</Button>
            </div>
        </div>
    )
    
  }
}

export default StudentCourseDetail;