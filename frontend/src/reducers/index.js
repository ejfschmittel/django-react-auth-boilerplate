import { combineReducers } from "redux"


import authReducer from "./authReducer"
import formReducer from "./formReducer"

export default combineReducers({
    auth: authReducer,
    form: formReducer,
})