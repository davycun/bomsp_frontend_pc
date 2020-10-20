import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route,Switch} from "react-router-dom";

document.getElementsByTagName('body')[0].style.height = document.documentElement.clientHeight;
// window.addEventListener('resize',function(){
//     document.getElementsByTagName('body')[0].style.height = document.documentElement.clientHeight;
// });


ReactDOM.render((
    <Router>
        {/*<Route path="/" component={App}>*/}
        {/*</Route>*/}
        <Switch>
            <Route path="/" exact component={App}>
            </Route>
            <Route path="/login" component={Login}>
            </Route>
        </Switch>
    </Router>
), document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
