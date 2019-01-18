import React, {Suspense, lazy} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//TODO: Default loading component
//const ExamplePage = lazy(() => import('pages/ExamplePage'))


const Welcome = () =>  (
    <h1>Welcome</h1>
) 

export default () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/" component={Welcome}/>
            </Switch>
        </Suspense>
    </Router>
)