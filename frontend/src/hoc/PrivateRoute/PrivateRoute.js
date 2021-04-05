import React, { Fragment } from 'react'
import { Redirect , Route} from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({component: Component,token,permission, ...rest}) => {

    // check permission before processing
    

    //look for permission status in redux store ( current user )



    //
    return (

        
        <Route {...rest} render={props => (
            token ? 
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
    

    
}
const mapState = (state) => {
    return {
        token: state.authReducer.token
    }
}


export default connect(mapState)(PrivateRoute)

