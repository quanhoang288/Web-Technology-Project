import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NewsItem.css'

export class NewsItem extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div className="newsItem">
        <Link to="#"><h2 className="title">Title: {this.props.title}</h2></Link>
        <i className ="time">Time: {this.props.time}</i><br/>
        <label className = "description">Description: {this.props.description}</label>
      </div>
    )
  }
}

export default NewsItem
