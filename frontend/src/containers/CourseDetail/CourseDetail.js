import React, {Component} from 'react';
import Table from '../../components/Table/Table';

import './CourseDetail.css';
import MOCK_DATA from '../../components/Table/MOCK.json';
import NOTI_MOCK from '../../components/Notiboard/mock.json';
import Grade from './Grade';
import File from './File';
import Notiboard from '../../components/Notiboard/Notiboard';
class CourseDetail extends Component{
    handleClick = (e) => {
        var name = e.target.value;
        var tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
          tabs[i].style.display = "none";  
        }
        document.getElementById(name).style.display = "block";  
    }
    render(){
        return (
            <div>
                <div class="tabs">
                    <button onClick={this.handleClick} value="posts">Posts</button>
                    <button onClick={this.handleClick} value="files">Files</button>
                    <button onClick={this.handleClick} value="students">Students</button>
                    <button onClick={this.handleClick} value="tests">Tests</button>

                </div>
                <div id="posts" class="tab">
                    <Notiboard data={NOTI_MOCK} rowPerPage={5}/>
                </div>

                <div id="files" class="tab" style={{display:'none'}}>
                    <File/>
                </div>

                <div id="students" class="tab" style={{display:'none'}}>
                    <Table 
                    data={MOCK_DATA} 
                    enableSearchAndPagination={true} 
                    rowPerPage={6}
                    />
                </div>

                <div id="tests" class="tab" style={{display:'none'}}>
                    <Grade/>
                </div>
            </div>
        );
    }
}

export default CourseDetail;