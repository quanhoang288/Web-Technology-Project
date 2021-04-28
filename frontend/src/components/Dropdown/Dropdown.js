import React, { Component } from 'react'
import './Dropdown.css'
export class Dropdown extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="dropdown">
                    <span>Hello {this.props.username}</span>
                    <div className="dropdown-content">
                        {this.props.children}
                    </div>
                </div>
            </div>

        )
    }
}

export default Dropdown
