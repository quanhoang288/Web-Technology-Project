import React, { Component } from 'react'
import './StudentCourse.css'
import Card from '../../../components/Card/Card'
export class StudentCourse extends Component {
    render() {
        return (
            <div className='courses'>
                
                <div className='course-lists'>
                    <p>Enrolled</p>
                    <Card></Card>
                    <Card></Card>
                    
                </div>
                <div className='course-lists'>
                    <p>Ongoing</p>
                    <Card></Card>
                    <Card></Card>
                    
                </div>
                <div className='course-lists'>
                    <p>Upcoming</p>
                    <Card></Card>
                    <Card></Card>
                    
                </div>
                <div className='course-lists'>
                    <p>Closed</p>
                    <Card></Card>
                    <Card></Card>
                    
                </div>


            </div>
        )
    }
}

export default StudentCourse
