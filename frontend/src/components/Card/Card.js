import React, { Component } from 'react'
import './Card.css'
import img from '../../asset/eclass.png'
import {Link} from 'react-router-dom'
export class Card extends Component {
    

    render() {
        
        return (
            <div class="card">
                <div className='overflow'>
                        <img src={img} className='bigger_img'/>
                    </div>
                <div class="info">
                    <h4><b>Course1</b></h4>
                    <Link to='#'>Info</Link>
                </div>
            </div>
        )
    }
}

export default Card
