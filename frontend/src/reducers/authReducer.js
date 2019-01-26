import { REGISTER_USER_SUCCESS, AUTH_ERROR, LOGOUT_USER, LOGIN_USER_SUCCESS } from "actions/authTypes"

const INITIAL_STATE = {
    token: null,
    user: null,
}

const authReducer = (state = INITIAL_STATE, action) => {

   

    switch(action.type){
        case REGISTER_USER_SUCCESS :
            return {token: null, user: action.payload }
        case LOGIN_USER_SUCCESS :
            const {token, user} = action.payload
            return {token, user}
        case LOGOUT_USER:
            return INITIAL_STATE
        default:
            return state
    }
}

export default authReducer