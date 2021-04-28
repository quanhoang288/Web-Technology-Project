import React, { Component } from 'react'
import './Card.css'
import './MiniCard.css'
import {Link} from 'react-router-dom'
export class Card extends Component {
    

    render() {
        
        return (
            <div class="minicard">
                    <h4><b>News</b></h4>
                <div class="minicard-info">
                    
                    <Link to='#'>Detail</Link>
                </div>
            </div>
        )
    }
}

export default Card
