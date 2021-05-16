import React, { useState, useEffect } from 'react'

import img from '../../asset/eclass.png'
import { Link } from 'react-router-dom'
import './Card.css'
import { connect } from "react-redux";





const Card = ({ title, overview, price, id, user }) => {
    let path = ''
    
    if(user)
    {
        if(user.role === 'admin')
        {
            path = `/admin/manage/courses/${id}`
        }
        else if(user.role === 'student')
        {
            path = `/student/courses/${id}`
        }
        else if(user.role === 'teacher')
        {
            path = `/teacher/courses/${id}`
        }
    }
    else{
        path = `/courses/${id}`
    }
    
    return (
        <Link to={path}>
            <div class="card">
                <div className="card-header">
                    <img src={img} className='bigger_img' />
                </div>

                <div class="info">
                    <h1><b>Course1</b></h1>
                    <p>Teacher</p>
                    <h3>Price</h3>
                </div>
                <div className="card-over">
                    <h1><b>Course1</b></h1>
                    <p>Teacher</p>
                    <p>Description</p>
                    <ul>
                        <li>Skil1</li>
                        <li>Skil1</li>
                        <li>Skil1</li>
                    </ul>
                    <h3>Price</h3>



                </div>
            </div>
        </Link>

    )
}

const mapStateToProps = (state) => ({
    user:state.authReducer.user
})



export default connect(mapStateToProps, null)(Card)
