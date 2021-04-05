import axios from 'axios'
import { AUTH_ERROR, USER_LOADED, USER_LOADING } from './types'
import { HOST_URL } from '../../config'
export const loadUser = () => {
    return (dispatch, getState) => {
        const jwtToken = getState().authReducer.token
        dispatch({ type: USER_LOADING })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (jwtToken) {
            config.headers['Authorization'] = `Token ${jwtToken}`
        }
        axios.get(`${HOST_URL}/api/auth/user`, config)
            .then(res => {
                console.log(payload.data)
                dispatch({ type: USER_LOADED, payload: res.data })
            }).catch(err => {
                dispatch({ type: AUTH_ERROR })
            })
    }
}
export const login = () => {

}
export const logout = () => {

}