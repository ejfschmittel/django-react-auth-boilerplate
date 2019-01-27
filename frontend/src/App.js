import React, {Suspense, lazy} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from "react-redux"
import store from "./configureStore"

import Header from "components/Header.js"

import 'style/main.scss'

//TODO: Default loading component
//const ExamplePage = lazy(() => import('pages/ExamplePage'))


//local storage vs session storage




const RegisterPage = lazy(() => import('pages/users/RegisterPage'))
const LoginPage = lazy(() => import('pages/users/LoginPage'))
const RegisterPageTest = lazy(() => import('pages/users/RegisterPageTest'))

const jwt_token = localStorage.getItem("jwt_token")

if(jwt_token){
    
}

const Welcome = () =>  (
    <h1>Welcome</h1>
) 

export default () => (
    <Provider store={store}>
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Switch>
                    <Route path="/" component={Welcome} exact={true}/>
                    <Route path="/users/test/" component={RegisterPageTest} />
                    <Route path="/users/login/" component={LoginPage}/>
                    <Route path="/users/register/" component={RegisterPage}/>

                   
                </Switch>
            </Suspense>
        </Router>
    </Provider>
)