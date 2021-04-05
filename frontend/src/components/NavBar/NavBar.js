import React, { Component } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
export class NavBar extends Component {
    state = {
        clicked: false,
    }
    handleClick = () => {
        this.setState({clicked:!this.state.clicked})
    }
    render() {
        const nav_item = [
            {
                title:"Home",
                target:"#",
                cName:'nav-links'
            },
            {
                title:"Enrol",
                target:"#",
                cName:'nav-links'
            },
            {
                title:"Schedule",
                target:"#",
                cName:'nav-links'
            },
            {
                title:"Sign in",
                target:"#",
                cName:'nav-links'
            },
        ]

        return (
            <nav className="NavbarItems">
                <div className='navbar-logo'>react<i className='fab fa-react'></i></div>
                
                
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times'
                                                    :'fas fa-bars'    
                }></i>
                </div>
                <ul className='nav-menu'>
                    {
                        nav_item.map((elm, idx) => {
                            return(
                                <li  key={idx}>
                                    <Link to={elm.target+'/x'} className={elm.cName}>{elm.title}</Link>
                                </li>
                            )
                        })

                    }

                </ul>
            </nav>
        )
    }
}

export default NavBar
