import React, { Component } from 'react'
import './Backdrop.css'
export class Backdrop extends Component {
    render() {
        return (
            <div className='backdrop' onClick={this.props.toggleBackdrop}>
                
            </div>
        )
    }
}

export default Backdrop
