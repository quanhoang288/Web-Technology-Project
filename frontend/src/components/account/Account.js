import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

export class Account extends Component{
  render(){
    return(
      <div className="account">
        <img className="image" src="https://ctt-sis.hust.edu.vn/content/ANH/Anh_20183609.jpg"></img>
        <div className="name-role"> 
          <h2 className="name-account">Quan.HH</h2>
          <p className="role-account">Admin</p>
        </div>
      </div>
    )
  }
}

export default Account
