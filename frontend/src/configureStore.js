import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from "history/createBrowserHistory"
import thunk from 'redux-thunk'
import reducers from './reducers'

import {
    routerReducer,
    routerMiddleware,
} from "react-router-redux"

export const history = createHistory()

const INITIAL_STATE = {}
const enhancers = []
const middleware = [
    thunk,
    routerMiddleware(history)
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