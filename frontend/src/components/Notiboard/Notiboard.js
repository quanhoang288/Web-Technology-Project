import React, { Component } from 'react'


import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import './Notiboard.css'
export class Notiboard extends Component {
  state = {
    currentPage: 1,
    
  }
  
  paginate = pageNumber => this.setState({ currentPage: pageNumber })
  render() {


    const data = this.props.data
    const indexOfLastPost = this.state.currentPage * this.props.rowPerPage;
    const indexOfFirstPost = indexOfLastPost - this.props.rowPerPage;
    const currentRows = data.slice(indexOfFirstPost, indexOfLastPost);
    
    return (
      <div className="notiboard">
        
        <div className="plan">
          <h1>Plan</h1>
          <hr></hr>
          {
            currentRows.map((item, idx) => {
              return (<div className='plan-item' key={idx}>
                <div className="datetime">
                  {item.created_at}
                </div>
                <div className='content'>
                  <Link to='#'>
                    <p>{item.content}</p>
                  </Link>
                </div>
                <i class="fas fa-edit" ></i>
              </div>)

            })
          }
          <Pagination
            postsPerPage={this.props.rowPerPage}
            totalPosts={this.props.data.length}
            paginate={this.paginate}
            currentPage={this.state.currentPage}
          />
        </div>
        
      </div>
    )
  }
}

export default Notiboard
