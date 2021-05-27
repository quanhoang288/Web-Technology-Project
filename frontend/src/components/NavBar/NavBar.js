import React, { Component } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../store/actions/types'
export class NavBar extends Component {

    render() {


        return (
            <header class='header'>
                
                
                {
                    !this.props.user ?
                        <Link to='/login'>
                            <button className='links' >Log in</button>
                        </Link>
                        :
                        <Link  to='/login'>
                            <button className='links' onClick={this.props.signout} to='/login'>Log out</button>
                        </Link>

                }
                


            </header>

        )
    }
}

const mapState = (state) => {
    return (
        {
            user: state.authReducer.user
        }
    )
}
const mapDispatch = (dispatch) => {
    return (
        {
            login_success: (data) => dispatch({ type: LOGIN_SUCCESS, payload: data }),
            signout: () => dispatch({ type: LOGOUT_SUCCESS })
        }
    )
}

export default connect(mapState, mapDispatch)(NavBar)
