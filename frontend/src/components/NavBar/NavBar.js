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
                    <ul className='nav__links'>
                        <li>
                            <Link className='links' to='/login'>Log in</Link>
                        </li>
                        <li>
                            <Link className='links' to='/register'>Sign up</Link>
                        </li>
                        <li>
                            <Link className='links' to='/register'>Sign up</Link>
                        </li>


                    </ul>

                </nav>
                <button className='cta'>Contact</button>
            </header>



            // <nav className="NavbarItems">
            //     <div className='navbar-logo'>react<i className='fab fa-react'></i></div>



            //     <ul className='nav-menu'>
            //         {

            //             !this.props.user ?
            //                 <Link to='/login' className='nav-links'>Sign in</Link>
            //                 :
            //                 <Dropdown className='nav-links' username = {this.props.user.username}>
            //                     <Link to='/login' onClick={this.props.signout}>Log out</Link>
            //                 </Dropdown>



            //         }

            //     </ul>
            // </nav>
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
