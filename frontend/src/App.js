import React, {Suspense, lazy} from 'react'
import { Router, Route, Switch } from 'react-router-dom';
//import { Router, Route, Switch, browserHistory } from 'react-router'
//import {ConnectedRouter} from "react-router-redux"
import {Provider} from "react-redux"
import store from "reducers/configureStore"

import AuthReqRoute from "routing/AuthReqRoute"

import history from "reducers/history"

import Header from "components/Header.js"

import 'style/main.scss'


import {checkAuth} from "actions/authActions"

 console.log(store.dispatch(checkAuth()))


const RegisterPage = lazy(() => import('pages/users/RegisterPage'))
const LoginPage = lazy(() => import('pages/users/LoginPage'))
//const RegisterPageTest = lazy(() => import('pages/users/RegisterPageTest'))

console.log(history)


const Welcome = () =>  (
    <h1>Welcome</h1>
) 

const Test = () => (
    <h1>Auth Route</h1>
)

export default () => (
    
        <Provider store={store}>
             <Router history={history}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Header />
                    <Switch>
                        <Route path="/" component={Welcome} exact={true}/>
                        <AuthReqRoute path="/test/" component={Test} />
                        <Route path="/users/login/" component={LoginPage}/>
                        <Route path="/users/register/" component={RegisterPage}/>
                        

                    
                    </Switch>
                </Suspense>
            </Router>
        </Provider>
)

/*
    
    
*/