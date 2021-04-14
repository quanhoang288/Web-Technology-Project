import React, { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, token, permission, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (token) {
                if (this.props.user.role === permission) {
                    return (<Component {...props} />)
                }
                return <div>Permission deined</div>
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

