import React, { Component } from 'react'
import './StudentInfo.css'
export class StudentInfo extends Component {
    render() {
        return (
            <div class="user-info">
                <div class="left">
                    <img src="https://i.imgur.com/cMy8V5j.png" alt="user" width="100" />
                    <h4>Alex William</h4>
                    <p>UI Developer</p>
                </div>
                <div class="right">
                    <div class="info">
                        <h3>Information</h3>
                        <div class="info_data">
                            <div class="data">
                                <h4>Email</h4>
                                <p>alex@gmail.com</p>
                            </div>
                            <div class="data">
                                <h4>Phone</h4>
                                <p>0001-213-998761</p>
                            </div>
                        </div>
                    </div>

                    <div class="projects">
                        <h3>Projects</h3>
                        <div class="projects_data">
                            <div class="data">
                                <h4>Recent</h4>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div class="data">
                                <h4>Most Viewed</h4>
                                <p>dolor sit amet.</p>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        )
    }
}

export default StudentInfo
