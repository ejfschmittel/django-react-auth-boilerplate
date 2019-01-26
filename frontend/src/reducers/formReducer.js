import { FORM_MESSAGE, FORM_ERRORS } from "actions/formTypes"

const INITIAL_STATE = {
    errors: {},
    message: null,
}

const formReducer = (state = INITIAL_STATE, action) => {

    console.log(action.type)
    console.log(action.payload)

    switch(action.type){
        case FORM_MESSAGE :
        
            return {...state, message: action.payload}
        case FORM_ERRORS:
            return {...state, errors: action.payload}
        default:
            return state
    }
}

export default formReducer