import { combineReducers } from "redux"

import {routerReducer} from "react-router-redux"
import authReducer from "./authReducer"
import formReducer from "./formReducer"

export default combineReducers({
    routerReducer,
    auth: authReducer,
    form: formReducer,
})