import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Aggregated from './components/Aggregated/chart-parent';
import Login from './components/Login/login';
import RealTime from './components/RealTime2/chart-parent';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render( <Router>
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path='/Login' component={Login} />
    <Route path='/Home' component={RealTime} />
    <Route path="/Historical" component={Aggregated} />
  </Switch>
</Router>, document.getElementById('root')
);
const container = document.getElementById("root");
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
