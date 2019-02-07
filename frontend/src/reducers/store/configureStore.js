import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import {routerMiddleware,syncHistoryWithStore} from "react-router-redux"

import reducers from 'reducers'

const INITIAL_STATE = {}
const enhancers = []
const middleware = [
    thunk,
    //routerMiddleware(history)
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
    reducers,
    INITIAL_STATE,
    composedEnhancers
)

export default store