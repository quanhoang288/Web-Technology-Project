import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Account from '../account/Account';
export class Sidebar extends Component {
  getSidebarItems = () =>{
    let arr = [
      { icon: "fas fa-qrcode", title: "Dashboard"},
      { icon: "fas fa-link", title:"Shortcuts",},
      { icon: "fas fa-stream", title:"Overview",},
      { icon: "fas fa-calendar-week", title:"Events",},
      { icon: "far fa-question-circle", title:"About",},
      { icon: "fas fa-sliders-h", title:"Services",},
      { icon: "far fa-envelope", title:"Contact",}
      
    ]
    return arr;
  }

  render() {
    let arr = this.getSidebarItems()
    return (
      <div className='sidebar'>
        <Account></Account>
        <ul>
          {
            arr.map((item)=>  <li><Link to ="#"><i className = {item.icon}></i>{item.title}</Link></li> )
          }
        </ul>
      </div>
    )
  }
}


export default Sidebar