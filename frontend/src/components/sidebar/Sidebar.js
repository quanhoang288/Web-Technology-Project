import React, { Component, Fragment } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import Backdrop from '../Backdrop/Backdrop'
export class Sidebar extends Component {
    state = {
        sidebar_open: false
    }

    toggleBackdrop = () => {
        this.setState({ sidebar_open: !this.state.sidebar_open })
    }
    render() {


        let items = []

        switch (this.props.permission) {

            case 'admin':

                items = [
                    <li><Link to="/admin/dashboard"><i className="fas fa-qrcode"></i>Dashboard</Link></li>,
                    <li><Link to="/admin/manage/students"><i className="fas fa-qrcode"></i>Students</Link></li>,
                    <li><Link to="/admin/manage/teachers"><i className="fas fa-qrcode"></i>Teachers</Link></li>,
                    <li><Link to="/admin/manage/courses"><i className="fas fa-qrcode"></i>Courses</Link></li>,

                ]
                break
            case 'teacher':
                items = [
                    <li><Link to="/teacher/info"><i className="fas fa-qrcode"></i>General Info</Link></li>,
                    <li><Link to="/teacher/courses"><i className="fas fa-qrcode"></i>Courses</Link></li>,
                    <li><Link to="/teacher/assignment"><i className="fas fa-qrcode"></i>Assignment</Link></li>,
                ]
                break
            case 'student':
                items = [
                    <li><Link to="/student"><i className="fas fa-qrcode"></i>Home</Link></li>,
                    <li><Link to="/student/info"><i className="fas fa-qrcode"></i>General Info</Link></li>,
                    
                    <li><Link to="/student/payment"><i className="fas fa-qrcode"></i>Payment</Link></li>,
                    <li><Link to="/student/enrolled"><i className="fas fa-qrcode"></i>Enrolled</Link></li>,
                    <li><Link to="/student/schedule"><i className="fas fa-qrcode"></i>Schedule</Link></li>,

                ]
                break
        }
        return (

            <Fragment>
                <div class="sidebar-wrapper">
                    <div className={this.props.permission === 'default' ? 'sidebar-disable' : 'sidebar-enable'}>
                        <input type="checkbox" id="check" checked={this.state.sidebar_open ? true : false} />
                        <label htmlFor="check" >
                            <i class="fas fa-bars" id="btn" onClick={this.toggleBackdrop} ></i>
                            <i class="fas fa-times" id="cancel" onClick={this.toggleBackdrop}></i>
                        </label>
                        <div className='sidebar'>
                            <header> . </header>
                            <ul>
                                {items}
                            </ul>
                        </div>

                    </div>
                </div>
                
                {this.state.sidebar_open ? <Backdrop toggleBackdrop={this.toggleBackdrop} /> : null}
                
            </Fragment>

        )
    }
}

export default Sidebar;
