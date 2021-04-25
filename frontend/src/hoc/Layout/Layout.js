import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Layout.css'
class Layout extends Component {
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Sidebar permission={this.props.permission}></Sidebar>
                
                    {this.props.children}
                

            </div>
        )
    }
}



export default Layout

