import React from 'react'
import './Button.css'
export default function Button(props) {
    return (
        <button className='btn'
            onClick={props.onClick}
        
        >{props.children}</button>
    )
}
