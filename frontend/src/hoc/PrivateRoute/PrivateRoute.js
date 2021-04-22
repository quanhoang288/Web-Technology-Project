import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component,token,user, permission, ...rest }) => {
    console.log(permission)
    return (
        <Route {...rest} render={props => {
            if (token) {
                if (user.role === permission) {
                    return (<Component {...props} />)
                }
                return <h1>Permission deined</h1>
            }
            return <Redirect to="/login" />


        }} />
    );
}
const mapState = (state) => {
    return {
        token: state.authReducer.token,
        user: state.authReducer.user
    }
}


export default connect(mapState)(PrivateRoute)

