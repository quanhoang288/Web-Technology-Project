import React, { Component } from 'react'
import Carousel from '../../../components/Carousel/Carousel'
import Card from '../../../components/Card/Card'
import Pagination from '../../../components/Pagination/Pagination'
import News from '../../../components/News/News'
import './AdminDashboard.css'
export class Dashboard extends Component {
    state = {
        currentPage: 1,
        postsPerPage: 5,
    }
    paginate = pageNumber => this.setState({currentPage:pageNumber})

    render() {
        const posts = [
            {"id":1, 'title':'abc'},
            {"id":1, 'title':'abc'},
            {"id":1, 'title':'abc'},
            {"id":1, 'title':'abc'},
            {"id":1, 'title':'abc'},
            {"id":1, 'title':'abc'},
            {"id":1, 'title':'abc'},
            {"id":1, 'title':'abc'},
            {"id":1, 'title':'abc'},
            {"id":1, 'title':'bom bom'},
            {"id":1, 'title':'second to last'},
            {"id":1, 'title':'last'},
        ]
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        
        return (
            <React.Fragment>
                  {/* <News posts={currentPosts} loading={false} />
                 <Pagination
        postsPerPage={this.state.postsPerPage}
        totalPosts={posts.length}
        paginate={this.paginate}
        currentPage={this.state.currentPage}
      /> */}
      <div>Statistics</div>
                
            </React.Fragment>


        )
    }
}
export default Dashboard
