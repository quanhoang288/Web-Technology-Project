import React, { Component } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
export class Sidebar extends Component {
    render() {

        let items = []
        switch (this.props.permission) {
            case 'admin':
                items = [
                    <li><Link to="/admin/dashboard"><i className="fas fa-qrcode"></i>Dashboard</Link></li>,
                    <li><Link to="/admin/manage/students"><i className="fas fa-qrcode"></i>Students</Link></li>,
                    <li><Link to="/admin/manage/teachers"><i className="fas fa-qrcode"></i>Teachers</Link></li>,
                ]
                break
            case 'teacher':
                items = [
                    
                ]
                break
            case 'student':
                items = [
                    <li><Link to="/student/info"><i className="fas fa-qrcode"></i>General Info</Link></li>,
                    <li><Link to="/student/payment"><i className="fas fa-qrcode"></i>Payment</Link></li>,
                    <li><Link to="/student/courses"><i className="fas fa-qrcode"></i>Course</Link></li>,
                    <li><Link to="/student/assignment"><i className="fas fa-qrcode"></i>Assignment</Link></li>,
                    <li><Link to="/student/schedule"><i className="fas fa-qrcode"></i>Schedule</Link></li>,

                ]
                break
        }

        return (
            <div className={this.props.permission === 'default' ? 'sidebar-disable' : 'sidebar-enable'}>
                <input type="checkbox" id="check" />
                <label htmlFor="check">
                    <i class="fas fa-bars" id="btn"></i>
                    <i class="fas fa-times" id="cancel"></i>
                </label>
                <div class="sidebar">
                    <header> . </header>
                    <ul>
                        {items}
                    </ul>
                </div>

            </div>


        )
    }
}

export default Sidebar
