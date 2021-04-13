import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar'


class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar></NavBar>
                <main className='Content'>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}



export default Layout

