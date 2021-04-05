import { AUTH_ERROR, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, USER_LOADED, USER_LOADING } from '../actions/types'
const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

const initState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    user: parseJwt(localStorage.getItem('token'))
}


// action creator
export default (state = initState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload['token'])

            
            return {
                ...state,
                token: action.payload['token'],
                user:parseJwt(action.payload['token']),
                
                
                isLoading: false

            }
        case LOGIN_ERROR:
            console.log("INVALID CREDENTIALS")
            return state
        case AUTH_ERROR:
            console.log("NO CREDENTIAL PROVIDED")
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}