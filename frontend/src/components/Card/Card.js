import React, { useState, useEffect } from 'react'

import img from '../../asset/eclass.png'
import { Link, useLocation } from 'react-router-dom'
import './Card.css'
const Card = ({ title, overview, price, id }) => {
    const path = useLocation().pathname
    return (
        <Link to={`${path}/${id}`}>
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

export default Card
