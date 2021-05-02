import React, { useState, useEffect } from 'react'
import './Card.css'
import img from '../../asset/eclass.png'
import { Link } from 'react-router-dom'

const Card = ({ title, overview, price, id }) => {
    return (
        <Link to='#'>
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
