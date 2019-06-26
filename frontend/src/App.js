import React, {Suspense, lazy} from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import {Provider} from "react-redux"


import {store, history} from "reducers/store"
import {checkAuth} from "actions/authActions"

import AuthReqRoute from "routing/helpers/AuthReqRoute"
import Header from "components/Header.js"

import 'style/main.scss'


// try login after reload
store.dispatch(checkAuth())


const RegisterPage = lazy(() => import('pages/users/RegisterPage'))
const LoginPage = lazy(() => import('pages/users/LoginPage'))
const TestPage = lazy(() => import('pages/StyleTest'))


const Welcome = () =>  (
    <h1>Welcome</h1>
) 

const AuthRoute = () => (
    <h1>Auth Route</h1>
)

export default () => (   
    <Provider store={store}>
            <Router history={history}>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Switch>
                    <Route path="/" component={Welcome} exact={true}/>
                    <Route path="/mytest/" component={TestPage} />
                    <AuthReqRoute path="/test/" component={AuthRoute} />
                    <Route path="/users/login/" component={LoginPage}/>
                    <Route path="/users/register/" component={RegisterPage}/> 
                </Switch>
            </Suspense>
        </Router>
    </Provider>
)
