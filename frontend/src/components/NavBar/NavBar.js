import React, { Component } from 'react'
import './NavBar.css'
import Dropdown from '../Dropdown/Dropdown'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../store/actions/types'
export class NavBar extends Component {

    render() {


        return (
            <header class='header'>
                <div className='logo'>Logo</div>
                <nav>
                    {/* <ul className='nav__links'>
                        <li>
                            <Link className='links' to='/login'>Log in</Link>
                        </li>
                        <li>
                            <Link className='links' to='/register'>Sign up</Link>
                        </li>
                        <li>
                            <Link className='links' to='/register'>Sign up</Link>
                        </li>


                    </ul> */}

                </nav>
                {
                    !this.props.user ?
                        <button>
                            <Link className='links' to='/login'>Log in</Link>
                        </button>
                        :
                        <button onClick={this.props.signout}>
                            <Link className='links' to='/'>Log out</Link>
                        </button>

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
