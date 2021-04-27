import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './News.css';
import NewsItem from '../newsItem/NewsItem'

export class News extends Component{
  constructor (props) {
    super(props);
  }

  getNewsItem = () =>{
    let arr = [
      {title: "Web", time: "14/04/2021", description:"none"},
      {title: "Technology", time: "13/04/2021", description:"none"},
      {title: "Math", time: "10/04/2021", description:"none"}
    ]
    return arr;
  }


  render(){
    let arr = this.getNewsItem();
    return(
      <div className="news">
        <ul>
          {
            arr.map((item) => <NewsItem title={item.title} time = {item.time} description={item.description}></NewsItem>)
          }
        </ul>
      </div>
    )
  }
}

export default News