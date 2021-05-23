import React from 'react'
import './Button.css'
export default function Button(props) {
    return (
        <button className='btn'
            type = {props.type ? props.type : null }
            onClick={props.onClick}
        
        >{props.children}</button>
    )
}
