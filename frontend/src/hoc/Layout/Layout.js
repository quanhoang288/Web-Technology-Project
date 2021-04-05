import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar'

import { connect } from 'react-redux'
class Layout extends Component {
    

    

    render () {
        
        return (
            <React.Fragment>
                
                <NavBar></NavBar>
                {/* {
                    this.props.user ?
                    <p>{this.props.user['role']}</p>
                    :
                    <p>Need logged in</p>
                } */}
                <main className='Content'>
                    {this.props.children}
                </main>
                </React.Fragment>
        )
    }
}

const mapState = (state) => {
    return (
        {
            user : state.authReducer.user
        }
    )
}

export default connect(mapState, null)(Layout)
// export default Layout;
